// Run with:
// mongosh "your-mongodb-uri" scripts/mongo-seed.js
//
// This script seeds 5 documents for each main collection:
// permissions, roles, companies, users, jobs, resumes

const now = new Date();
const adminSeedId = new ObjectId();
const adminEmail = 'seed-admin@local.test';

const audit = {
  _id: adminSeedId,
  email: adminEmail,
};

const passwordHash =
  '$2b$10$Ef8lCCbZJ/WQ3CTaPk1DwehqPx4cpy0X9d7aqEgDcmMPwX52WhP8y';

db = db.getSiblingDB('nest_test');

print('Using database: ' + db.getName());

const permissionNames = [
  'Seed - View Users',
  'Seed - Create User',
  'Seed - View Jobs',
  'Seed - Create Resume',
  'Seed - Manage Companies',
];

const roleNames = [
  'SEED_ADMIN',
  'SEED_RECRUITER',
  'SEED_HR',
  'SEED_INTERVIEWER',
  'SEED_CANDIDATE',
];

const companyNames = [
  'Seed Tech Vietnam',
  'Blue Ocean Software',
  'Mekong Data Labs',
  'Lotus Cloud',
  'Sai Gon Product Studio',
];

const userEmails = [
  'admin.seed@example.com',
  'recruiter.seed@example.com',
  'hr.seed@example.com',
  'interviewer.seed@example.com',
  'candidate.seed@example.com',
];

const jobNames = [
  'Backend Developer NodeJS',
  'Frontend React Developer',
  'QA Engineer',
  'DevOps Engineer',
  'Business Analyst',
];

const resumeEmails = [
  'candidate1.seed@example.com',
  'candidate2.seed@example.com',
  'candidate3.seed@example.com',
  'candidate4.seed@example.com',
  'candidate5.seed@example.com',
];

db.permissions.deleteMany({ name: { $in: permissionNames } });
db.roles.deleteMany({ name: { $in: roleNames } });
db.resumes.deleteMany({ email: { $in: resumeEmails } });
db.jobs.deleteMany({ name: { $in: jobNames } });
db.users.deleteMany({ email: { $in: userEmails } });
db.companies.deleteMany({ name: { $in: companyNames } });

const permissions = [
  {
    _id: new ObjectId(),
    name: permissionNames[0],
    apiPath: '/api/v1/users',
    method: 'GET',
    module: 'USERS',
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: permissionNames[1],
    apiPath: '/api/v1/users',
    method: 'POST',
    module: 'USERS',
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: permissionNames[2],
    apiPath: '/api/v1/jobs',
    method: 'GET',
    module: 'JOBS',
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: permissionNames[3],
    apiPath: '/api/v1/resumes',
    method: 'POST',
    module: 'RESUMES',
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: permissionNames[4],
    apiPath: '/api/v1/companies',
    method: 'PATCH',
    module: 'COMPANIES',
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
];

db.permissions.insertMany(permissions);

const roles = [
  {
    _id: new ObjectId(),
    name: roleNames[0],
    description: 'Full access for seed admin',
    isActive: true,
    permissions: permissions.map((item) => item._id),
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: roleNames[1],
    description: 'Recruiter role for seed data',
    isActive: true,
    permissions: [permissions[2]._id, permissions[3]._id, permissions[4]._id],
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: roleNames[2],
    description: 'HR role for seed data',
    isActive: true,
    permissions: [permissions[0]._id, permissions[2]._id],
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: roleNames[3],
    description: 'Interviewer role for seed data',
    isActive: true,
    permissions: [permissions[2]._id],
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: roleNames[4],
    description: 'Candidate role for seed data',
    isActive: true,
    permissions: [permissions[3]._id],
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
];

db.roles.insertMany(roles);

const companies = [
  {
    _id: new ObjectId(),
    name: companyNames[0],
    address: 'Ha Noi, Viet Nam',
    logo: 'seed-tech-vietnam.png',
    description: 'Product company focused on backend systems',
    createdBy: { _id: adminSeedId.toString(), email: adminEmail },
    deletedBy: { _id: '', email: '' },
    createAt: now,
    updateAt: now,
    isDeletedAt: false,
    deletedAt: null,
  },
  {
    _id: new ObjectId(),
    name: companyNames[1],
    address: 'Da Nang, Viet Nam',
    logo: 'blue-ocean-software.png',
    description: 'Outsourcing company with global clients',
    createdBy: { _id: adminSeedId.toString(), email: adminEmail },
    deletedBy: { _id: '', email: '' },
    createAt: now,
    updateAt: now,
    isDeletedAt: false,
    deletedAt: null,
  },
  {
    _id: new ObjectId(),
    name: companyNames[2],
    address: 'Can Tho, Viet Nam',
    logo: 'mekong-data-labs.png',
    description: 'Data engineering and analytics team',
    createdBy: { _id: adminSeedId.toString(), email: adminEmail },
    deletedBy: { _id: '', email: '' },
    createAt: now,
    updateAt: now,
    isDeletedAt: false,
    deletedAt: null,
  },
  {
    _id: new ObjectId(),
    name: companyNames[3],
    address: 'Remote - Viet Nam',
    logo: 'lotus-cloud.png',
    description: 'Cloud native startup building SaaS tools',
    createdBy: { _id: adminSeedId.toString(), email: adminEmail },
    deletedBy: { _id: '', email: '' },
    createAt: now,
    updateAt: now,
    isDeletedAt: false,
    deletedAt: null,
  },
  {
    _id: new ObjectId(),
    name: companyNames[4],
    address: 'Ho Chi Minh City, Viet Nam',
    logo: 'saigon-product-studio.png',
    description: 'Product studio for startup launches',
    createdBy: { _id: adminSeedId.toString(), email: adminEmail },
    deletedBy: { _id: '', email: '' },
    createAt: now,
    updateAt: now,
    isDeletedAt: false,
    deletedAt: null,
  },
];

db.companies.insertMany(companies);

const users = [
  {
    _id: new ObjectId(),
    email: userEmails[0],
    password: passwordHash,
    name: 'Seed Admin',
    age: 30,
    gender: 'male',
    address: 'Ha Noi',
    company: { _id: companies[0]._id, name: companies[0].name },
    role: roles[0]._id,
    refreshToken: null,
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: userEmails[1],
    password: passwordHash,
    name: 'Seed Recruiter',
    age: 28,
    gender: 'female',
    address: 'Da Nang',
    company: { _id: companies[1]._id, name: companies[1].name },
    role: roles[1]._id,
    refreshToken: null,
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: userEmails[2],
    password: passwordHash,
    name: 'Seed HR',
    age: 29,
    gender: 'female',
    address: 'Can Tho',
    company: { _id: companies[2]._id, name: companies[2].name },
    role: roles[2]._id,
    refreshToken: null,
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: userEmails[3],
    password: passwordHash,
    name: 'Seed Interviewer',
    age: 31,
    gender: 'male',
    address: 'Remote',
    company: { _id: companies[3]._id, name: companies[3].name },
    role: roles[3]._id,
    refreshToken: null,
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: userEmails[4],
    password: passwordHash,
    name: 'Seed Candidate',
    age: 24,
    gender: 'female',
    address: 'Ho Chi Minh City',
    company: { _id: companies[4]._id, name: companies[4].name },
    role: roles[4]._id,
    refreshToken: null,
    createdBy: audit,
    updatedBy: audit,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
];

db.users.insertMany(users);

const jobs = [
  {
    _id: new ObjectId(),
    name: jobNames[0],
    skills: ['NodeJS', 'NestJS', 'MongoDB'],
    company: {
      _id: companies[0]._id,
      name: companies[0].name,
      logo: companies[0].logo,
    },
    location: 'Ha Noi',
    salary: 1800,
    quantity: 2,
    level: 'Junior',
    description: 'Build backend APIs using NestJS and MongoDB.',
    startDate: new Date('2026-04-01T00:00:00.000Z'),
    endDate: new Date('2026-05-01T00:00:00.000Z'),
    isActive: true,
    createdBy: { _id: users[0]._id, email: users[0].email },
    updatedBy: { _id: users[0]._id, email: users[0].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: jobNames[1],
    skills: ['ReactJS', 'TypeScript', 'HTML/CSS'],
    company: {
      _id: companies[1]._id,
      name: companies[1].name,
      logo: companies[1].logo,
    },
    location: 'Da Nang',
    salary: 1600,
    quantity: 1,
    level: 'Middle',
    description: 'Develop frontend screens and connect APIs.',
    startDate: new Date('2026-04-03T00:00:00.000Z'),
    endDate: new Date('2026-05-05T00:00:00.000Z'),
    isActive: true,
    createdBy: { _id: users[1]._id, email: users[1].email },
    updatedBy: { _id: users[1]._id, email: users[1].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: jobNames[2],
    skills: ['Manual Test', 'API Testing', 'Postman'],
    company: {
      _id: companies[2]._id,
      name: companies[2].name,
      logo: companies[2].logo,
    },
    location: 'Can Tho',
    salary: 1200,
    quantity: 2,
    level: 'Fresher',
    description: 'Test web applications and backend APIs.',
    startDate: new Date('2026-04-05T00:00:00.000Z'),
    endDate: new Date('2026-05-07T00:00:00.000Z'),
    isActive: true,
    createdBy: { _id: users[2]._id, email: users[2].email },
    updatedBy: { _id: users[2]._id, email: users[2].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: jobNames[3],
    skills: ['Docker', 'AWS', 'CI/CD'],
    company: {
      _id: companies[3]._id,
      name: companies[3].name,
      logo: companies[3].logo,
    },
    location: 'Remote',
    salary: 2200,
    quantity: 1,
    level: 'Senior',
    description: 'Maintain infrastructure and deployment pipelines.',
    startDate: new Date('2026-04-07T00:00:00.000Z'),
    endDate: new Date('2026-05-10T00:00:00.000Z'),
    isActive: true,
    createdBy: { _id: users[3]._id, email: users[3].email },
    updatedBy: { _id: users[3]._id, email: users[3].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    name: jobNames[4],
    skills: ['Communication', 'Agile', 'Documentation'],
    company: {
      _id: companies[4]._id,
      name: companies[4].name,
      logo: companies[4].logo,
    },
    location: 'Ho Chi Minh City',
    salary: 1400,
    quantity: 1,
    level: 'Junior',
    description: 'Gather requirements and bridge business with tech team.',
    startDate: new Date('2026-04-09T00:00:00.000Z'),
    endDate: new Date('2026-05-12T00:00:00.000Z'),
    isActive: true,
    createdBy: { _id: users[4]._id, email: users[4].email },
    updatedBy: { _id: users[4]._id, email: users[4].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
];

db.jobs.insertMany(jobs);

const resumes = [
  {
    _id: new ObjectId(),
    email: resumeEmails[0],
    userId: users[4]._id,
    url: 'cv/candidate1-seed.pdf',
    status: 'PENDING',
    companyId: companies[0]._id,
    jobId: jobs[0]._id,
    history: [
      {
        status: 'PENDING',
        updatedAt: now,
        updatedBy: { _id: users[0]._id, email: users[0].email },
      },
    ],
    createdBy: { _id: users[4]._id, email: users[4].email },
    updatedBy: { _id: users[0]._id, email: users[0].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: resumeEmails[1],
    userId: users[4]._id,
    url: 'cv/candidate2-seed.pdf',
    status: 'REVIEWING',
    companyId: companies[1]._id,
    jobId: jobs[1]._id,
    history: [
      {
        status: 'PENDING',
        updatedAt: new Date('2026-04-10T08:00:00.000Z'),
        updatedBy: { _id: users[1]._id, email: users[1].email },
      },
      {
        status: 'REVIEWING',
        updatedAt: now,
        updatedBy: { _id: users[1]._id, email: users[1].email },
      },
    ],
    createdBy: { _id: users[4]._id, email: users[4].email },
    updatedBy: { _id: users[1]._id, email: users[1].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: resumeEmails[2],
    userId: users[4]._id,
    url: 'cv/candidate3-seed.pdf',
    status: 'APPROVED',
    companyId: companies[2]._id,
    jobId: jobs[2]._id,
    history: [
      {
        status: 'PENDING',
        updatedAt: new Date('2026-04-09T08:00:00.000Z'),
        updatedBy: { _id: users[2]._id, email: users[2].email },
      },
      {
        status: 'APPROVED',
        updatedAt: now,
        updatedBy: { _id: users[2]._id, email: users[2].email },
      },
    ],
    createdBy: { _id: users[4]._id, email: users[4].email },
    updatedBy: { _id: users[2]._id, email: users[2].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: resumeEmails[3],
    userId: users[4]._id,
    url: 'cv/candidate4-seed.pdf',
    status: 'REJECTED',
    companyId: companies[3]._id,
    jobId: jobs[3]._id,
    history: [
      {
        status: 'PENDING',
        updatedAt: new Date('2026-04-08T08:00:00.000Z'),
        updatedBy: { _id: users[3]._id, email: users[3].email },
      },
      {
        status: 'REJECTED',
        updatedAt: now,
        updatedBy: { _id: users[3]._id, email: users[3].email },
      },
    ],
    createdBy: { _id: users[4]._id, email: users[4].email },
    updatedBy: { _id: users[3]._id, email: users[3].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    email: resumeEmails[4],
    userId: users[4]._id,
    url: 'cv/candidate5-seed.pdf',
    status: 'PENDING',
    companyId: companies[4]._id,
    jobId: jobs[4]._id,
    history: [
      {
        status: 'PENDING',
        updatedAt: now,
        updatedBy: { _id: users[4]._id, email: users[4].email },
      },
    ],
    createdBy: { _id: users[4]._id, email: users[4].email },
    updatedBy: { _id: users[4]._id, email: users[4].email },
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  },
];

db.resumes.insertMany(resumes);

print('Seed completed successfully.');
print('Inserted counts:');
print('permissions: ' + permissions.length);
print('roles: ' + roles.length);
print('companies: ' + companies.length);
print('users: ' + users.length);
print('jobs: ' + jobs.length);
print('resumes: ' + resumes.length);
print('Seed login password for all users: 123456');
