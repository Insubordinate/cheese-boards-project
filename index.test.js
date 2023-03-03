const {Cheese,Board,User} = require('./models/index')
const {seedCheese,seedBoard,seedUser} = require('./cheese_dummy')
const {sequelize} = require('./db')




describe('Testing CheeseBoard',()=>{

    beforeEach(async()=>{
        await sequelize.sync({force:true})
    })


    test('Can create Cheese Table and Insert Data',async()=> {

        await Cheese.bulkCreate(seedCheese)
        results = await Cheese.findAll()
        expect(results!=null).toBe(true)


    })


    test('Can create Board Table and Insert Data',async()=> {

        await Board.bulkCreate(seedCheese)
        results = await Board.findAll()
        expect(results!=null).toBe(true)

    })



    test('Can create User Table and Insert Data',async()=> {

        await User.bulkCreate(seedCheese)
        results = await User.findAll()
        expect(results!=null).toBe(true)
    })
    

    test('Board/User Association',async()=>{

        await User.bulkCreate(seedUser)
        await Board.bulkCreate(seedBoard)

        let testUser = await User.findByPk(1)
        let testBoards = await Board.findAll()

        await testUser.addBoards(testBoards)

        let verifiedData = await User.findByPk(1,{include:Board})
        expect(verifiedData.Boards.length).toBe(3)
        

    })
    test('Cheese/Board Association',async()=>{

        await Cheese.bulkCreate(seedCheese)
        await Board.bulkCreate(seedBoard)

        let testCheese = await Cheese.findAll()
        let testBoard = await Board.findAll()


        for(let i = 0; i<3;i++){
            await testCheese[i].addBoards(testBoard)
            await testBoard[i].addCheeses(testCheese)
        }
        

        let verifiedDataBoard = await Board.findAll({include:Cheese})
        let verifiedDataCheese = await Cheese.findAll({include:Board})
        for(let j = 0;j<3;j++){
            expect(verifiedDataBoard[j].Cheeses.length).toBe(3)
            expect(verifiedDataCheese[j].Boards.length).toBe(3)
        }

        

    })

})
