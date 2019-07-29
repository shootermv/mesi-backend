const mongoose = require('mongoose');



class Seeder {
    //_userSerice;  
    constructor(User) {
      this._userService = User;
    }

    async seedDB() {
        await this.cleanDB();
        await this.seedUsers();
    }

    // cleans db 
    async cleanDB() {      
        await mongoose.connection.collections['users'].remove();
        console.log('"users" collection dropped');
      
        await mongoose.connection.collections['tasks'].remove();
        console.log('"tasks" collection dropped');      
    }

    // seed users
    async  seedUsers() {
        console.log('seeding users...');
        require('./users.json').forEach(async user=>{
            const newUser = await this._userService.create(user);
            if (user.role === 'developer') {
                // assign some tasks to developers
               await this._userService.assignTask(newUser, {_id: mongoose.Types.ObjectId(), summary: 'task num 1', status: 0});
            }
        
        })
    }

}
module.exports = Seeder; 