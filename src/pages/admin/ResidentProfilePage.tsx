import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
    Activity,
    Cake,
    Droplet,
    Edit3,
    Heart,
    HeartPulse,
    IdCard,
    MapPin,
    Phone,
    Ruler,
    Users,
    Weight,
} from 'lucide-react';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import residentService from '../../services/resident.service';
import householdResidentService from '../../services/householdresident.service';

const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';
};

type FamilyMember = {
    id: number;
    residentId: number;
    relation: string;
    resident?: {
        id: number;
        firstName: string;
        lastName: string;
        birthday?: string;
        gender?: string;
        contactNumber?: string;
    };
};

const relationBadgeStyles: Record<string, string> = {
    Owner: 'bg-[#008FFB]/10 text-[#008FFB]',
    Spouse: 'bg-pink-100 text-pink-600',
    Child: 'bg-amber-100 text-amber-600',
    Parent: 'bg-purple-100 text-purple-600',
};

const ResidentProfilePage: FC = () => {
    const [fresidentData, setResidentData] = useState<any>();
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [familyLoading, setFamilyLoading] = useState(true);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/editprofile/' + id);
    };

    const fetchResidentData = async () => {
        if (!id) {
            console.error("Resident ID is undefined\n");
            return;
        }

        try {
            const response = await residentService.getSingleResident(id);
            setResidentData(response.data);
        } catch (error) {
            console.error("Error fetching resident data:", error);
        }
    };

    const fetchFamilyMembers = async () => {
        if (!id) return;
        try {
            setFamilyLoading(true);
            const response = await householdResidentService.getFamilyMembersByResidentId(id);
            setFamilyMembers(response.data || []);
        } catch (error) {
            console.error("Error fetching family members:", error);
            setFamilyMembers([]);
        } finally {
            setFamilyLoading(false);
        }
    };

    useEffect(() => {
        fetchResidentData();
        fetchFamilyMembers();
    }, [id]);

    return (
        <DashboardContainer>
            <div className="p-6 max-w-6xl mx-auto">
                {!fresidentData ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-10 w-10 rounded-full border-4 border-[#008FFB]/20 border-t-[#008FFB] animate-spin" />
                            <p className="text-gray-500">Loading resident profile...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Hero / Header Card */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#008FFB] to-[#00C1A7] p-8 shadow-lg mb-8">
                            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                            <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10" />

                            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-2xl font-bold text-white ring-4 ring-white/30">
                                        {getInitials(fresidentData.firstName, fresidentData.lastName)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                            {fresidentData.firstName} {fresidentData.lastName}
                                        </h2>
                                        <p className="text-white/80 text-sm mt-1">
                                            Resident ID #{fresidentData.id}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {fresidentData.gender && (
                                                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                                                    {fresidentData.gender}
                                                </span>
                                            )}
                                            {fresidentData.maritalState && (
                                                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                                                    {fresidentData.maritalState}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Link to="edit">
                                    <button
                                        className="flex items-center gap-2 bg-white text-[#008FFB] font-semibold rounded-lg px-5 py-2.5 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
                                        onClick={handleEditProfile}
                                    >
                                        <Edit3 size={16} />
                                        Edit Profile
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-5">Personal Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <DetailItem icon={<IdCard size={18} />} label="NIC" value={fresidentData.nic} />
                                <DetailItem
                                    icon={<Cake size={18} />}
                                    label="Age"
                                    value={fresidentData.birthday ? `${calculateAge(fresidentData.birthday)} years` : 'N/A'}
                                />
                                <DetailItem icon={<Droplet size={18} />} label="Blood Group" value={fresidentData.bloodGroup} />
                                <DetailItem icon={<MapPin size={18} />} label="Division" value={fresidentData.divisionId} />
                                <DetailItem icon={<Phone size={18} />} label="Contact" value={fresidentData.contactNumber} />
                                <DetailItem icon={<Users size={18} />} label="Marital Status" value={fresidentData.maritalState} />
                            </div>
                        </div>

                        {/* Health Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <StatCard icon={<HeartPulse size={20} />} label="Blood Pressure" value={fresidentData.bloodPressure || 'N/A'} accent="text-rose-500 bg-rose-50" />
                            <StatCard icon={<Heart size={20} />} label="Heart Rate" value={fresidentData.heartRate ? `${fresidentData.heartRate} BPM` : 'N/A'} accent="text-red-500 bg-red-50" />
                            <StatCard icon={<Ruler size={20} />} label="Height" value={fresidentData.height ? `${fresidentData.height} cm` : 'N/A'} accent="text-blue-500 bg-blue-50" />
                            <StatCard icon={<Weight size={20} />} label="Weight" value={fresidentData.weight ? `${fresidentData.weight} kg` : 'N/A'} accent="text-emerald-500 bg-emerald-50" />
                        </div>

                        {/* Family Members */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex items-center gap-2 mb-5">
                                <Users size={20} className="text-[#008FFB]" />
                                <h3 className="text-lg font-semibold text-gray-800">Family Members</h3>
                            </div>

                            {familyLoading ? (
                                <p className="text-gray-500 text-sm">Loading family members...</p>
                            ) : familyMembers.filter((m) => m.resident && m.resident.id !== fresidentData.id).length === 0 ? (
                                <p className="text-gray-500 text-sm">No other family members found for this household.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {familyMembers
                                        .filter((m) => m.resident && m.resident.id !== fresidentData.id)
                                        .map((member) => (
                                            <button
                                                key={member.id}
                                                onClick={() => navigate(`/admin/residents/profile/${member.resident?.id}`)}
                                                className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 text-left hover:border-[#008FFB]/40 hover:shadow-md transition-all"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#008FFB]/10 text-sm font-semibold text-[#008FFB]">
                                                    {getInitials(member.resident?.firstName, member.resident?.lastName)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium text-gray-800 truncate">
                                                        {member.resident?.firstName} {member.resident?.lastName}
                                                    </p>
                                                    <span
                                                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${relationBadgeStyles[member.relation] || 'bg-gray-100 text-gray-600'
                                                            }`}
                                                    >
                                                        {member.relation}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* Patient History */}
                        {fresidentData.patientHistory && fresidentData.patientHistory.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-2 mb-5">
                                    <Activity size={20} className="text-[#008FFB]" />
                                    <h3 className="text-lg font-semibold text-gray-800">Patient History</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Clinic Name</th>
                                                <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                                                <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Report</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fresidentData.patientHistory.map((record: any, index: number) => (
                                                <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 text-sm text-gray-700">{record.clinicName}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{record.date}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <button
                                                            onClick={() => navigate(record.reportLink)}
                                                            className="text-[#008FFB] hover:text-[#00C1A7] font-medium"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </DashboardContainer>
    );
};

const DetailItem: FC<{ icon: React.ReactNode; label: string; value?: string | number }> = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#008FFB]/10 text-[#008FFB]">
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value || 'N/A'}</p>
        </div>
    </div>
);

const StatCard: FC<{ icon: React.ReactNode; label: string; value: string; accent: string }> = ({ icon, label, value, accent }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg mb-3 ${accent}`}>
            {icon}
        </div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800 mt-0.5">{value}</p>
    </div>
);

export default ResidentProfilePage;
