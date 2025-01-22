import { NextRequest, NextResponse } from "next/server";

let tasks = [
  { id: 1, title: "Learn Next js ", completed: false },
  { id: 2, title: "Build an API ", completed: false },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request : NextRequest){
    const {title} = await request.json();
    if(title === ""){
        //return NextResponse.status(400).json({error: "Title is required"});
    }else{
    const newTask = {id: tasks.length + 1, title, completed: false};
    tasks.push(newTask);
    }
    return NextResponse.json(tasks);
    
}

export async function DELETE(request : NextRequest){
    const { id } = await request.json();
    tasks = tasks.filter((task) => task.id!== id);
    return NextResponse.json(tasks);
}

export async function PUT(request : NextRequest){
    const { id, title } = await request.json();
    tasks = tasks.map((task) => task.id === id? {...task, title}: task);
    return NextResponse.json(tasks);
}
