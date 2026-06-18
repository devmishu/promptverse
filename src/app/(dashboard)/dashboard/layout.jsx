import DashboardHearer from "./_components/DashboardHearer";
import { DashboardSideBar } from "./_components/DashboardSidebar";



const DashboardLayout = ({ children }) => {
    return (
        <div>
            <DashboardHearer />
            <div className='flex gap-5 min-h-screen'>

                <DashboardSideBar />
                <div className='flex-1'>{children}</div>
            </div>
        </div>

    );
};

export default DashboardLayout;