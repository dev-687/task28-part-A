const Todo = require('../models/TodoModel'); 

/** ✅ Create Task */
exports.createTodo = async (req, res) => {
    try {
        const { task, completed } = req.body;
        const newTodo = new Todo({ task, completed });
        await newTodo.save();
        console.log("Create Todo API called", req.body);
        return res.json({ message: "Todo Created Successfully", todo: newTodo });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/** ✅ Get All Tasks */
exports.getTodos = async (req, res) => {
    console.log('getTodos');
    
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })
       return res.status(200).json(todos);
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
};

/** Update A Task */

exports.updateTodo=async(req,res)=>{
    try {
        const todo=await Todo.findById(req.params.id)
        if (!todo) {
            return res.status(404).json({ message: "Task not found." }); 
        }
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
        );
        return res.status(200).json({
            message: "Task updated successfully.",
            todo: updatedTodo
        });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


/*** Delete a Task */

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*** Get Task by id */

exports.getTodo=async(req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }


        res.status(200).json({
            success: true,
            message: "Task reterived successfully.",
            todo:todo
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}