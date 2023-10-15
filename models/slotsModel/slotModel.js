import {pool} from "../../services/sqlService.js";


export function getBookedSlots(){
    const q = "SELECT * FROM slots";
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject({error:err})
                return
            }

            connection.query(q,(err,rows)=>{
                connection.release();

                if(err){
                    reject({error:err})
                    return
                }
                resolve(rows)
            })
        })
    })
}

export function getBookedSlotsOnDid(did){
    const q = `SELECT * FROM slots WHERE did=${did}`;
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject({error:err})
                return
            }

            connection.query(q,(err,rows)=>{
                connection.release();

                if(err){
                    reject({error:err})
                    return
                }
                resolve(rows)
            })
        })
    })
}

export function insertSlot(data){
    const q="INSERT INTO slots SET ?"
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err)
                return
            }
            connection.query(q,data,(err,results)=>{
                connection.release();
                if(err){
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    })
}
