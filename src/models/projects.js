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

// export { getAllProjects }



const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };