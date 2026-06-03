import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';

import {showProjectsPage, showProjectDetailsPage} from './controllers/projects.js';

import {showCategoriesPage, showCategoryDetailsPage} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm} from './controllers/organizations.js';
import { organizationValidation} from './controllers/organizations.js';
import { showEditOrganizationForm} from './controllers/organizations.js';
import { processEditOrganizationForm } from './controllers/organizations.js';

import { showNewProjectForm } from './controllers/projects.js';
import { processNewProjectForm } from './controllers/projects.js';
import { projectValidation } from './controllers/projects.js';

import { showAssignCategoriesForm } from './controllers/categories.js';
import { processAssignCategoriesForm } from './controllers/categories.js';
 
import { showEditProjectForm, processEditProjectForm } from './controllers/projects.js';

import { 
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation 
} from './controllers/categories.js';

import { showUserRegistrationForm, processUserRegistrationForm, 
    showLoginForm,
    processLoginForm, 
    processLogout,
    requireLogin,
    showDashboard,
    requireRole } from './controllers/users.js';

import { showUsersPage } from './controllers/users.js';

const router = express.Router();

// Home
router.get('/', showHomePage);

// Organizations
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Projects
router.get('/projects', showProjectsPage);

// NEW: Project details page (IMPORTANT)
router.get('/project/:id', showProjectDetailsPage);

// Categories
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);

router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

router.get('/users', requireRole('admin'), showUsersPage);


export default router;