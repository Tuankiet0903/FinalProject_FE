import { 
  SearchOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  BellOutlined,
  FileTextOutlined,
  EditOutlined,
  AppstoreOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import { Input, Avatar, Button, Tooltip } from 'antd'
import logo from '../assets/logo-clickup.svg'

const HEADER_HEIGHT = 56;

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#621639] text-white"
      style={{ 
        height: `${HEADER_HEIGHT}px`,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000}}>
      <div className="flex items-center flex-1 max-w-xl gap-4">
        <div className="w-8 h-8">
          <img 
            src={logo} // Sử dụng require để import hình ảnh khi dùng ReactJS
            alt="Logo"
            width={12}
            height={12}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            suffix={
              <Button 
                type="text" 
                size="small" 
                className="text-white hover:text-white/80"
                icon={<span className="font-medium">AI</span>}
              />
            }
            className="w-[80%] bg-[#7B3B59] border-0 text-white placeholder:text-gray-400 hover:bg-[#7b3b59]/90 focus:bg-[#7b3b59]"
          />
        </div>

      <div className="flex items-center gap-4">
        <Tooltip title="New">
          <Button 
            type="text" 
            icon={<span className="font-medium text-white">New</span>}
            className="text-white hover:text-white/80"
          />
        </Tooltip>

        {[
          { icon: <MessageOutlined />, title: "Messages" },
          { icon: <ClockCircleOutlined />, title: "Time" },
          { icon: <CalendarOutlined />, title: "Calendar" },
          { icon: <BellOutlined />, title: "Notifications" },
          { icon: <FileTextOutlined />, title: "Notes" },
          { icon: <EditOutlined />, title: "Edit" },
          { icon: <AppstoreOutlined />, title: "Apps" },
          { icon: <EllipsisOutlined />, title: "More" },
        ].map((item, index) => (
          <Tooltip key={index} title={item.title}>
            <Button
              type="text"
              icon={item.icon}
              className="text-white hover:text-white/80 flex items-center justify-center w-8 h-8 min-w-[28px]"
            />
          </Tooltip>
        ))}

        <Avatar className="bg-purple-700 cursor-pointer">H</Avatar>
      </div>
    </header>
  );
};

export default Header;
