import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.project_date,
            organization.name AS organization_name
        FROM public.projects
        JOIN public.organization
            ON projects.organization_id = organization.organization_id
        ORDER BY projects.project_date;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllProjects }