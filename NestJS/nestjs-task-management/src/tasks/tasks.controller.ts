import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as taskModel from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): taskModel.Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): taskModel.Task {
    return this.tasksService.createTask(title, description);
  }
}
