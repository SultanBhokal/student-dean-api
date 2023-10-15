import {pool} from "../../services/sqlService.js";


const getUsers =  ()=>{
    try {
        
        return new Promise((resolve,reject)=>{
            const query = "SELECT * FROM userDetails";
            pool.getConnection((err,connection)=>{
                if(err){
                    reject([{error:"Database error"}])
                    console.log("Error while connecting db");
                    return
                }

                connection.query(query,(err,rows)=>{
                    connection.release();
                    if(err){
                        console.log("Error while quering");
                        reject([{error:"DB error"}])
                        return
                    }
                    else{
                        resolve(rows)
                    }
                })
            })
        })

    } catch (error) {
        return {error:error,data:[]}
    }
}

function createUser(data){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject({error:"Connection problem"})
                console.log(err)
                return
            }
            connection.query("INSERT INTO users SET ?",data,(err,results)=>{
                connection.release();
                if(err){
                    console.log(err)
                    reject({error:err})
                    return
                }
                resolve(results)
            })
        })
    })
}

function generateSession(userId,session,expires){

    const query = `UPDATE userDetails SET session='${session}',sessionExpiry=${expires} WHERE id=${userId}`;

    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject([{error:err}]);
                console.log("Connection error with sql db");
                return
            }

            connection.query(query,(err,results)=>{
                connection.release();
                if(err){
                    console.log("error while updating session ")

                    reject([{error:err}]);
                    return
                }
                else{
                    resolve(results);
                }
            })
        })
    })
}

function getUserById(uid){
    
    return new Promise((resolve,reject)=>{
        const query = `SELECT * FROM users WHERE id=${uid}`;

        pool.getConnection((err,connection)=>{
            if(err){
                reject([{error:"Database error"}])
                console.log("Error while connecting db");
                return
            }

            connection.query(query,(err,rows)=>{
                connection.release();
                if(err){
                    console.log("Error while quering");
                    reject([{error:"DB error"}])
                    return
                }
                else{
                    resolve(rows)
                }
            })
        })
    })
}

function getUserByEnrollAndPass(enroll,pass){
    return new Promise((resolve,reject)=>{
        const query = `SELECT * FROM userDetails WHERE enrollment=${enroll} AND pass='${pass}'`;
       
        pool.getConnection((err,connection)=>{
            if(err){
                reject([{error:"Database error"}])
                console.log("Error while connecting db");
                return
            }

            connection.query(query,(err,rows)=>{
                connection.release();
                if(err){
                    console.log("Error while quering");
                    reject([{error:err}])
                    return
                }
                else{
                    resolve(rows)
                }
            })
        })
    })
}

function getSessionDetails(sessionId){
    const q=`SELECT * FROM userDetails WHERE session='${sessionId}'`;
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                console.log(err)
                reject({error:err})
                return
            }
            connection.query(q,(err,rows)=>{
                connection.release();
                if(err){
                    console.log(err)
                    reject({err})
                    return
                }
                resolve(rows)
            })
        })
    });
}

export {getUsers,generateSession,createUser,getUserById,getUserByEnrollAndPass,getSessionDetails}