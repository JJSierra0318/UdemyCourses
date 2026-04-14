import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as taskModel from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): taskModel.Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): taskModel.Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
