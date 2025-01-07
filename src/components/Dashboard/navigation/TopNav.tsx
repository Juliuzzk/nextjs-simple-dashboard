import { Bell, Moon, Sun, PanelLeftClose, PanelLeft } from 'lucide-react';
import { UserMenu } from './UserMenu';

interface TopNavProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export function TopNav({ isCollapsed, onToggleSidebar }: TopNavProps) {
  return (
    <div className="navbar bg-base-200 px-4 border-b border-base-300 h-16">
      <div className="flex-1">
        <button 
          onClick={onToggleSidebar}
          className="btn btn-ghost btn-sm"
        >
          {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>
      
      <div className="flex-none gap-2">
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" className="theme-controller" value="dark" />
          <Sun className="swap-on" />
          <Moon className="swap-off" />
        </label>

        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell size={20} />
            <span className="badge badge-sm badge-primary indicator-item">2</span>
          </div>
        </button>

        <UserMenu />
      </div>
    </div>
  );
}