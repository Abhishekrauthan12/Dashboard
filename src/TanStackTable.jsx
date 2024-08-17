import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './App.css';
import Avatar from 'react-avatar';

// Define the Zod schema for validation
const schema = z.object({
  avatarSrc: z.string().nonempty("Photo is required"),
  name: z.string().nonempty("Name is required"),
  username: z.string().nonempty("Username is required"),
  status: z.string().nonempty("Status is required"),
  role: z.string().nonempty("Role is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  teams: z.string().nonempty("Teams are required")
});

const roles = ['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer'];
const teams = ['Design', 'Product', 'Marketing', 'Technology'];

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'Phoenix Baker',
      username: '@phoenix',
      status: 'Active',
      role: 'Product Manager',
      email: 'phoenix@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      avatarSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Lana Steiner',
      username: '@lana',
      status: 'Active',
      role: 'Frontend Developer',
      email: 'lana@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      avatarSrc: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Demi Wilkinson',
      username: '@demi',
      status: 'Active',
      role: 'Backend Developer',
      email: 'demi@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      avatarSrc: 'https://randomuser.me/api/portraits/men/85.jpg',
    },
    {
      name: 'Candice Wu',
      username: '@candice',
      status: 'Active',
      role: 'Fullstack Developer',
      email: 'candice@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      avatarSrc: 'https://randomuser.me/api/portraits/women/67.jpg',
    },
    {
      name: 'Natali Craig',
      username: '@natali',
      status: 'Active',
      role: 'UX Designer',
      email: 'natali@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      avatarSrc: 'https://randomuser.me/api/portraits/women/25.jpg',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      avatarSrc: '',
      name: '',
      username: '',
      status: '',
      role: '',
      email: '',
      teams: ''
    }
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole ? member.role === selectedRole : true) &&
      (selectedTeams.length > 0 ? selectedTeams.some(team => member.teams.includes(team)) : true)
  );

  const handleAddMemberClick = () => {
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleEditClick = (index) => {
    const memberToEdit = teamMembers[index];
    setValue('avatarSrc', memberToEdit.avatarSrc);
    setValue('name', memberToEdit.name);
    setValue('username', memberToEdit.username);
    setValue('status', memberToEdit.status);
    setValue('role', memberToEdit.role);
    setValue('email', memberToEdit.email);
    setValue('teams', memberToEdit.teams.join(', '));
    setEditingIndex(index);
    setAvatarPreview(memberToEdit.avatarSrc);
    setShowForm(true);
  };

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      // Editing an existing member
      const updatedMembers = [...teamMembers];
      updatedMembers[editingIndex] = {
        ...data,
        teams: data.teams.split(',').map(team => team.trim()).filter(team => team)
      };
      setTeamMembers(updatedMembers);
    } else {
      // Adding a new member
      setTeamMembers([...teamMembers, {
        ...data,
        teams: data.teams.split(',').map(team => team.trim()).filter(team => team)
      }]);
    }
    reset(); 
    setShowForm(false); 
    setAvatarPreview('');
    setEditingIndex(null);
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('avatarSrc', reader.result); 
        setAvatarPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterClick = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleTeamChange = (event) => {
    const value = event.target.value;
    setSelectedTeams(prev => prev.includes(value) ? prev.filter(team => team !== value) : [...prev, value]);
  };

  const [selectedMember, setSelectedMember] = useState(null);

  const handleTableCellClick = (member) => {
    setSelectedMember(member);
  };

  const handleClosePopup = () => {
    setSelectedMember(null);
  };

  return (
    <div className="team-container">
      <div className='TopHead flex p-5 justify-between'>
        <h2 className='flex text-2xl font-semibold'>
          Team members <button className='btn'>100 users</button>
        </h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        <button className="filter-icon" onClick={handleFilterClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-8">
            <path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
        </button>
        <button className="add-member-button bg-purple-700 text-white font-bold p-2 text-sm rounded-lg" onClick={handleAddMemberClick}>
          + ADD MEMBER
        </button>
      </div>

      {/* Filter Popup */}
      {showFilterPopup && (
        <div className="filter-popup">
          <div className="filter-popup-content">
            <h3>Filter by Role</h3>
            <select value={selectedRole} onChange={handleRoleChange}>
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <h3>Filter by Teams</h3>
            {teams.map(team => (
              <label key={team}>
                <input
                  type="checkbox"
                  value={team}
                  checked={selectedTeams.includes(team)}
                  onChange={handleTeamChange}
                />
                {team}
              </label>
            ))}
            <button className="close-button" onClick={handleFilterClick}>Close</button>
          </div>
        </div>
      )}

      {/* Add/Edit Member Form */}
      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="add-member-form">
            <label>
              Photo:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />}
              {errors.avatarSrc && <p>{errors.avatarSrc.message}</p>}
            </label>
            <label>
              Name:
              <input
                type="text"
                {...register('name')}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label>
              Username:
              <input
                type="text"
                {...register('username')}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </label>
            <label>
              Status:
              <input
                type="text"
                {...register('status')}
              />
              {errors.status && <p>{errors.status.message}</p>}
            </label>
            <label>
              Role:
              <input
                type="text"
                {...register('role')}
              />
              {errors.role && <p>{errors.role.message}</p>}
            </label>
            <label>
              Email:
              <input
                type="email"
                {...register('email')}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </label>
            <label>
              Teams:
              <input
                type="text"
                {...register('teams')}
              />
              {errors.teams && <p>{errors.teams.message}</p>}
            </label>
            <button type="submit">{editingIndex !== null ? 'Update Member' : 'Add Member'}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}


{selectedMember && (
        <div className="user-popup">
          <div className="user-popup-content">
            <button className="close-button" onClick={handleClosePopup}>×</button>
            <div className="popup-profile">
              <img src={selectedMember.avatarSrc} alt="Profile" className="popup-avatar" />
              <h3>{selectedMember.name}</h3>
              <p><strong>Username:</strong> {selectedMember.username}</p>
              <p><strong>Status:</strong> {selectedMember.status}</p>
              <p><strong>Role:</strong> {selectedMember.role}</p>
              <p><strong>Email:</strong> {selectedMember.email}</p>
              <p><strong>Teams:</strong> {selectedMember.teams.join(', ')}</p>
            </div>
          </div>
        </div>
      )}


      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
            <th>Email address</th>
            <th>Teams</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeamMembers.map((member, index) => (
            <tr key={index}>
              <td className='flex clickable-cell'  onClick={() => handleTableCellClick(member)}>
                <Avatar src={member.avatarSrc} size="50" round={true} className='m-2'/><br/>
                {member.name}
                <br />
                {member.username}
              </td>
              <td>
                <span className={`status-dot ${member.status.toLowerCase()}`} />
                {member.status}
              </td>
              <td>{member.role}</td>
              <td>{member.email}</td>
              <td>
                {member.teams.map((team, teamIndex) => (
                  <span key={teamIndex} className={`team-tag ${team.toLowerCase()}`}>
                    {team}
                  </span>
                ))}
              </td>
              <td>
                <button className="delete-button mx-2" onClick={() => handleDeleteMember(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
                <button className="edit-button mx-3" onClick={() => handleEditClick(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembers;
