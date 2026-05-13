-- WEEK 1
CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	   ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
	   ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png')
;


-- WEEK 2
CREATE TABLE projects (
	project_id SERIAL PRIMARY KEY,
	organization_id INTEGER NOT NULL,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(150) NOT NULL,
	project_date DATE NOT NULL,
	FOREIGN KEY (organization_id) REFERENCES organization (organization_id)
);


INSERT INTO projects (organization_id, title, description, location, project_date)
VALUES (1, 'Park Cleanup', 'Join us to clean up local parks and make them beautiful!', 'New York Park', '2026-05-13'),
	   (2, 'Food Drive', 'Help collect and distribute food to those in need.', 'Church', '2026-05-16'),
	   (3, 'Community Tutoring', 'Volunteer to tutor students in various subjects.', 'BYUI', '2026-05-15'),
	   (1, 'Senior Center Visit', 'Spend time playing games and chatting with elderly residents.', 'Sunset Care Home', '2026-05-18'),
       (2, 'Beach Restoration', 'Remove plastic waste and restore natural sand dunes.', 'Coastal Marina', '2026-05-20'),
       (3, 'Animal Shelter Help', 'Walk dogs, clean cages, and socialize rescue animals.', 'Paws & Claws Shelter', '2026-05-23'),
	   (1, 'Tree Planting Initiative', 'Plant native trees to help increase urban canopy cover.', 'Oakridge Forest Park', '2026-05-25'),
	   (2, 'Blood Donation Drive', 'Assist with registration and support local blood donors.', 'Red Cross Center', '2026-05-27'),
	   (3, 'Library Book Sorting', 'Organize inventory and repair damaged children books.', 'City Public Library', '2026-05-30'),
	   (1, 'Soup Kitchen Shift', 'Prepare, cook, and serve hot meals to community members.', 'Downtown Mission', '2026-06-01'),
	   (2, 'Community Garden Setup', 'Build raised beds and plant seasonal vegetable seeds.', 'Green Thumb Plot', '2026-06-03'),
	   (3, 'Clothing Donation Sort', 'Inspect, fold, and organize winter gear for distributions.', 'Thrift Outreach', '2026-06-06'),
	   (1, 'Trail Maintenance Day', 'Clear overgrown brush and fix signs on hiking routes.', 'Canyon Nature Trail', '2026-06-08'),
	   (2, 'Toy Repair Workshop', 'Fix and sanitize donated toys for holiday distributions.', 'Kids First Warehouse', '2026-06-11'),
	   (3, 'School Supply Packing', 'Fill backpacks with notebooks and pens for students.', 'Youth First Center', '2026-06-13')
;