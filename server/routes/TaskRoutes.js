const express = require('express');
const router = express.Router();
const Task = require('../model/task.model');
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    console.log("TaskRoute");
    res.send("Welcome to task Route")
})

router.get('/list', (req, res) => {
    Task.find()
        .sort("-createdAt")
        .exec((err, tasks) => {
            // error checking
            if (err || !tasks) {
                return res.status(400).json({
                    error: "Something went wrong in finding all tasks",
                });
            }
            // return all the tasks in json format
            res.json(tasks);
        });
})

router.post('/updateLimit', async (req, res) => {
    // for changing the status
    const task = new Task(req.body.task);
    const percentDone = req.body.percent;


})

router.post('/add', async (req, res) => {
    console.log("adding task");
    const task = new Task(req.body);
    // create a todo instance by passing 'task' field from 'req.body'
    await task.save((err, task) => {
        if (err || !task) {
            return res.status(400).json({
                error: "something went wrong",
            });
        }
        // todo is created
        // send the created todo as a json response
        res.json({ task });
    });
})

module.exports = router
