import DashboardHeader from "./_components/DashboardHearer";
import DashboardHearer from "./_components/DashboardHearer";
import { DashboardSideBar } from "./_components/DashboardSidebar";



const DashboardLayout = ({ children }) => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex sm:flex-row flex-col gap-5 '>

                <DashboardSideBar />
                <div className='flex-1'>{children}</div>
            </div>
        </div>

    );
};

export default DashboardLayout;