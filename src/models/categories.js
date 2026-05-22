import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.categories
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            categories.category_id,
            categories.name
        FROM public.categories
        JOIN public.project_categories
            ON categories.category_id = project_categories.category_id
        WHERE project_categories.project_id = $1
        ORDER BY categories.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.project_date AS date
        FROM public.projects
        JOIN public.project_categories
            ON projects.project_id = project_categories.project_id
        WHERE project_categories.category_id = $1
        ORDER BY projects.project_date;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};