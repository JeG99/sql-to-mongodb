const sql = require('mssql')
const mongo = require('mongodb')

async function mssqlQuery() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=MSI,1433;Database=Northwind;User Id=admin;Password=824494;Encrypt=false')
        const result = await sql.query('select * from Employees')
        //console.dir(result.recordset)

        return result.recordset
    } catch(err) {
        return { error: 'error' }
    }
}

// MongoDB connection
const url = 'mongodb://localhost:27017'
const client = new mongo.MongoClient(url)

// DB name
const dbName = 'js-test'

async function mongoTransaction(queryResult) {
    await client.connect()
    console.log('[MongoDB client] Conexión exitosa')
    const db = client.db(dbName)
    const collection = db.collection('employees')

    const insertResult = await collection.insertMany(queryResult)
    console.log('Inserted documents =>', insertResult)

    return 'Done.'
}

async function main() {
    let doc = await mssqlQuery()
    //console.log(doc)   
    mongoTransaction(doc)
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close())

    return 'Migration succesfull'
}

main()

