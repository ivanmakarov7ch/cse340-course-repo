import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.project_date AS date,
            organization.name AS organization_name
        FROM public.projects
        JOIN public.organization
            ON projects.organization_id = organization.organization_id
        ORDER BY projects.project_date;
    `;

    const result = await db.query(query);
    return result.rows;
};



const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            projects.project_id,
            projects.organization_id,
            projects.title,
            projects.description,
            projects.location,
            projects.project_date AS date,
            organization.name AS organization_name
        FROM projects
        JOIN organization
            ON projects.organization_id = organization.organization_id
        WHERE projects.organization_id = $1
        ORDER BY projects.project_date;
    `;

    const result = await db.query(query, [organizationId]);
    return result.rows;
};



const getUpcomingProjects = async (limit) => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.project_date AS date,
            projects.organization_id,
            organization.name AS organization_name
        FROM public.projects
        JOIN public.organization
            ON projects.organization_id = organization.organization_id
        WHERE projects.project_date >= CURRENT_DATE
        ORDER BY projects.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [limit]);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.project_date AS date,
            projects.organization_id,
            organization.name AS organization_name
        FROM public.projects
        JOIN public.organization
            ON projects.organization_id = organization.organization_id
        WHERE projects.project_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0];
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO projects (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (
    projectId,
    title,
    description,
    location,
    date,
    organizationId
) => {
    const query = `
        UPDATE projects
        SET
            title = $1,
            description = $2,
            location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const result = await db.query(query, [
        title,
        description,
        location,
        date,
        organizationId,
        projectId
    ]);

    if (result.rows.length === 0) {
        throw new Error('Failed to update project');
    }

    return result.rows[0].project_id;
};

// Additional Feature
// Add Volunteer
const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id)
        DO NOTHING;
    `;

    await db.query(query, [userId, projectId]);
};

// Remove Volunteer
const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteers
        WHERE user_id = $1
        AND project_id = $2;
    `;

    await db.query(query, [userId, projectId]);
};

// Check If User Is Already Volunteering
const isVolunteer = async (userId, projectId) => {
    const query = `
        SELECT *
        FROM project_volunteers
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

// Get All Projects User Volunteered For
const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.project_date AS date,
            organization.name AS organization_name
        FROM project_volunteers
        JOIN projects
            ON project_volunteers.project_id = projects.project_id
        JOIN organization
            ON projects.organization_id = organization.organization_id
        WHERE project_volunteers.user_id = $1
        ORDER BY projects.project_date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};



export {
    getAllProjects,
    getUpcomingProjects,
    getProjectsByOrganizationId,
    getProjectDetails,
    createProject,
    updateProject,
    addVolunteer,
    removeVolunteer,
    isVolunteer,
    getVolunteerProjects
};