import React, { useState, useRef, useEffect } from 'react';
import {
  HomeOutlined,
  InboxOutlined,
  FileTextOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
  FlagOutlined,
  ClockCircleOutlined,
  MoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RightOutlined,
  SearchOutlined,
  PlusOutlined,
  FolderOutlined,
  EllipsisOutlined,
  ProjectOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useSidebar } from './SidebarContext';
import { LAYOUT } from '../../utils/constants';

const MIN_SIDEBAR_WIDTH = 50;
const MAX_SIDEBAR_WIDTH = 500;
const DEFAULT_WIDTH = LAYOUT.DEFAULT_SIDEBAR_WIDTH;
const HEADER_HEIGHT = LAYOUT.HEADER_HEIGHT;

const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: 'inbox',
    icon: <InboxOutlined />,
    label: 'Inbox',
    badge: 3,
  },
  {
    key: 'docs',
    icon: <FileTextOutlined />,
    label: 'Docs',
  },
  {
    key: 'dashboards',
    icon: <DashboardOutlined />,
    label: 'Dashboards',
  },
  {
    key: 'clips',
    icon: <VideoCameraOutlined />,
    label: 'Clips',
  },
  {
    key: 'goals',
    icon: <FlagOutlined />,
    label: 'Goals',
  },
  {
    key: 'timesheets',
    icon: <ClockCircleOutlined />,
    label: 'Timesheets',
  },
  {
    key: 'more',
    icon: <MoreOutlined />,
    label: 'More',
  },
];

const spaceItems = [
  {
    key: 'project-requirement',
    icon: <ProjectOutlined />,
    label: 'Project Requirement',
  },
  {
    key: 'backlog',
    icon: 'B',
    label: 'BackLog',
  },
  {
    key: 'qa',
    icon: 'Q',
    label: 'QA',
  },
  {
    key: 'view-all-space',
    icon: <MenuOutlined />,
    label: 'View All Spaces View All Spaces',
  },
  {
    key: 'create-space',
    icon: <PlusOutlined />,
    label: 'Create Space',
  }
];

const SecondarySpacesSidebar = ({ isOpen, spaceItems, sidebarWidth }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-white border-r border-gray-200 h-screen overflow-hidden transition-all duration-200"
      style={{
        top: `${HEADER_HEIGHT}`,
        left: `${sidebarWidth}px`,
        width: '240px',
        height: `calc(100vh - ${HEADER_HEIGHT})`,
      }}
    >
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium">Spaces</span>
          <div className="flex items-center gap-2">
            <SearchOutlined />
            <EllipsisOutlined />
          </div>
        </div>
      </div>
      <div className="mb-4">
        {spaceItems.map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            isCollapsed={false}
          />
        ))}
      </div>
    </div>
  );
};

const MenuItem = ({ item, isActive, onClick, isCollapsed, isSpaceItem }) => {
  return (
    <button
      onClick={() => onClick(item.key)}
      className={`flex items-center gap-2 px-4 h-10 mx-auto w-[90%] rounded-lg text-left my-1 
          transition-all duration-200 border-none ${isSpaceItem
          ? 'group'
          : isActive
            ? 'bg-pink-50 text-pink-500'
            : 'text-gray-600 bg-white hover:text-gray-900 hover:bg-gray-100'}`}
      title={isCollapsed ? item.label : ''}
    >
      <span className={isActive ? 'text-pink-500' : 'text-gray-600'}>
        {item.icon}
      </span>
      {!isCollapsed && (
        <>
          <span className="truncate">{item.label}</span>
          {item.badge && (
            <span className="ml-auto bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  );
};

const Sidebar = () => {
  const { sidebarWidth, setSidebarWidth } = useSidebar();
  const [activeKey, setActiveKey] = useState('home');
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSpacesPopupOpen, setIsSpacesPopupOpen] = useState(false);
  const [isSpacesSidebarOpen, setIsSpacesSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const resizeRef = useRef(null);
  const spacesButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSpacesPopupOpen &&
        !spacesButtonRef.current?.contains(event.target) &&
        !event.target.closest('.spaces-popup')) {
        setIsSpacesPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSpacesPopupOpen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
        setSidebarWidth(newWidth);
        setIsCollapsed(newWidth <= MIN_SIDEBAR_WIDTH + 20);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const startResizing = () => {
    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
  };

  const toggleSidebar = () => {
    if (isCollapsed) {
      setSidebarWidth(DEFAULT_WIDTH);
      setIsCollapsed(false);
    } else {
      setSidebarWidth(MIN_SIDEBAR_WIDTH);
      setIsCollapsed(true);
    }
  };

  const handleSpacesClick = () => {
    setIsSpacesSidebarOpen(!isSpacesSidebarOpen);
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className="fixed left-0 bg-white border-r border-gray-200 flex flex-col"
        style={{
          width: `${sidebarWidth}px`,
          minWidth: `${MIN_SIDEBAR_WIDTH}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          top: `${HEADER_HEIGHT}px`
        }}
      >
        <div className={`p-4 border-b border-gray-200 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center text-white font-medium">
              P
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <h2 className="font-medium text-gray-900 truncate">PTM-2025</h2>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="mb-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.key}
                item={item}
                isActive={activeKey === item.key}
                onClick={setActiveKey}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>

          <hr className='mb-2' />

          {!isCollapsed ? (
            <>
              <div className="px-4 mb-2">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">Spaces</span>
                  <div className="flex items-center gap-2">
                    <SearchOutlined />
                    <EllipsisOutlined />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                {spaceItems.map((item) => (
                  <MenuItem
                    key={item.key}
                    item={item}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </>
          ) : (
            <button
              ref={spacesButtonRef}
              onClick={handleSpacesClick}
              className="flex items-center justify-center w-10 h-10 mx-auto rounded-lg hover:bg-gray-100"
            >
              <FolderOutlined className="text-gray-600" />
            </button>
          )}
        </nav>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md z-10 hover:bg-gray-50 z-1000"
        >
          {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>

        <div
          ref={resizeRef}
          className="absolute right-0 top-0 w-1 h-full cursor-ew-resize hover:bg-pink-500/20 transition-colors"
          onMouseDown={startResizing}
        />
      </div>

      <SecondarySpacesSidebar
        isOpen={isSpacesSidebarOpen}
        spaceItems={spaceItems}
        sidebarWidth={sidebarWidth}
      />
    </>
  );
};

export default Sidebar;