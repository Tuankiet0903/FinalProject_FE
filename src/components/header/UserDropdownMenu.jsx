import {
    User,
    Bell,
    Palette,
    Settings,
    Keyboard,
    Download,
    Users,
    HelpCircle,
    Trash2,
    LogOut,
    Volume2,
    Clock,
} from "lucide-react";
import { Avatar, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserDropdownMenu = () => {
    const location = useLocation();
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setUserAvatar(params.get("avatar"));
        setUserName(params.get("fullName"));
    }, [location]);

    return (
        <Menu className="w-80">
            <Menu.Item key="user">
                <div className="flex items-center gap-3 relative">
                    <div className="relative">
                        <Avatar size={40} src={userAvatar || "/placeholder.svg"} />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">{userName}</span>
                        <span className="text-xs text-green-500">Online</span>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="status" icon={<Clock className="mr-2 h-4 w-4" />}>Set status</Menu.Item>
            <Menu.Item key="mute" icon={<Volume2 className="mr-2 h-4 w-4" />}>Mute notifications</Menu.Item>
            <Menu.Item key="profile" icon={<User className="mr-2 h-4 w-4" />}>Profile</Menu.Item>
            <Menu.Item key="themes" icon={<Palette className="mr-2 h-4 w-4" />}>Themes</Menu.Item>
            <Menu.Item key="settings" icon={<Settings className="mr-2 h-4 w-4" />}>Settings</Menu.Item>
            <Menu.Item key="notifications" icon={<Bell className="mr-2 h-4 w-4" />}>Notification settings</Menu.Item>
            <Menu.Item key="shortcuts" icon={<Keyboard className="mr-2 h-4 w-4" />}>Keyboard shortcuts</Menu.Item>
            <Menu.Item key="download" icon={<Download className="mr-2 h-4 w-4" />}>Download apps</Menu.Item>
            <Menu.Item key="referrals" icon={<Users className="mr-2 h-4 w-4" />}>Referrals</Menu.Item>
            <Menu.Item key="help" icon={<HelpCircle className="mr-2 h-4 w-4" />}>Help</Menu.Item>
            <Menu.Item key="trash" icon={<Trash2 className="mr-2 h-4 w-4" />}>Trash</Menu.Item>
            <Menu.Item key="logout" icon={<LogOut className="mr-2 h-4 w-4 text-red-600" />} className="text-red-600">Log out</Menu.Item>
        </Menu>
    );
};

export default UserDropdownMenu;
