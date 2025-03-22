import { Avatar, Badge, Button } from "antd";
import { PlusOutlined, ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const TaskList = ({ tasks, title, statusColor, onAddTask }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Badge color={statusColor}>
          {title}
        </Badge>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 rounded bg-[#2d333b] hover:bg-[#353b44] transition-colors">
            <div className="flex items-center space-x-3">
              <span>{task.title}</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6 bg-purple-500">
                  <img src={task.assignee.avatar} alt={task.assignee.name} />
                </Avatar>
                <span className="text-sm text-gray-400">{task.assignee.name}</span>
              </div>

              <Badge className="bg-transparent border-gray-700">
                {task.priority}
              </Badge>

              {task.deadline && (
                <div className="flex items-center space-x-1">
                  <ClockCircleOutlined className="text-red-500" />
                  <span className="text-sm text-red-500">{task.deadline}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {task.status === "Not started" && <CheckCircleOutlined className="text-blue-500" />}
                {task.status === "In progress" && <CheckCircleOutlined className="text-green-500" />}
                {task.status === "Review" && <CheckCircleOutlined className="text-orange-500" />}
                <Badge className="text-sm">{task.status}</Badge>
              </div>
            </div>
          </div>
        ))}

        <Button className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#353b44]" onClick={onAddTask}>
          <PlusOutlined className="w-4 h-4 mr-2" />
          New task
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
