import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// // Import any needed model functions
// import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const title = 'Project Details';
    const project = await getProjectDetails(projectId);

    res.render('project', { title, project });
};

// // Define any controller functions
// const showProjectsPage = async (req, res) => {
//     const projects = await getAllProjects();
//     const title = 'Service Projects';

//     res.render('projects', { title, projects });
// };  

// // Export any controller functions
// export { showProjectsPage };

export {
    showProjectsPage,
    showProjectDetailsPage
};