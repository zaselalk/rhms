import { FC } from 'react';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import { UserStatCards } from '../../components/features/user-management/UserStatCards';
import { UserList } from '../../components/features/user-management/UserList';
import { UserRoleset } from '../../components/features/user-management/UserRoleset';


const UsersPage: FC = () => {
    return (
        <DashboardContainer>
            <div >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">User Details</h2>
                </div>
                <UserStatCards />
                <div className="grid grid-cols-12 gap-4 mb-6">
                    <UserList />
                    <UserRoleset />
                </div>
            </div>
        </DashboardContainer>
    );
};

export default UsersPage;
