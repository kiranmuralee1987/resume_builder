CREATE MIGRATION m1hqvcozgf43amvyrchujv3jraliind5rizw5zlfhhqaogbea2vwva
    ONTO initial
{
  CREATE TYPE default::Address {
      CREATE REQUIRED PROPERTY address1: std::str;
      CREATE PROPERTY address2: std::str;
      CREATE REQUIRED PROPERTY city: std::str;
      CREATE PROPERTY location_name: std::str;
      CREATE REQUIRED PROPERTY state: std::str;
      CREATE REQUIRED PROPERTY zipcode: std::str;
  };
  CREATE TYPE default::Technology {
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Project {
      CREATE MULTI LINK technologies: default::Technology;
      CREATE REQUIRED PROPERTY project_description: std::str;
      CREATE REQUIRED PROPERTY project_name: std::str;
  };
  CREATE TYPE default::Career {
      CREATE MULTI LINK projects: default::Project;
      CREATE REQUIRED PROPERTY company_location: std::str;
      CREATE REQUIRED PROPERTY company_name: std::str;
      CREATE REQUIRED PROPERTY job_role: std::str;
      CREATE PROPERTY joining_month: std::str;
      CREATE PROPERTY joining_year: std::str;
      CREATE PROPERTY releiving_month: std::str;
      CREATE PROPERTY releiving_year: std::str;
  };
  CREATE TYPE default::Certificate {
      CREATE PROPERTY title: std::str;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::Education {
      CREATE MULTI LINK projects: default::Project;
      CREATE REQUIRED PROPERTY course_end_month: std::str;
      CREATE REQUIRED PROPERTY course_end_year: std::str;
      CREATE REQUIRED PROPERTY course_name: std::str;
      CREATE REQUIRED PROPERTY course_start_month: std::str;
      CREATE REQUIRED PROPERTY course_start_year: std::str;
      CREATE REQUIRED PROPERTY institution_name: std::str;
      CREATE PROPERTY pass_percentage: std::str;
  };
  CREATE TYPE default::Skill {
      CREATE LINK technology: default::Technology;
      CREATE PROPERTY rating: std::int16;
  };
  CREATE TYPE default::Candidate {
      CREATE LINK address: default::Address;
      CREATE MULTI LINK career_details: default::Career;
      CREATE MULTI LINK certificates: default::Certificate;
      CREATE MULTI LINK education_details: default::Education;
      CREATE LINK skills: default::Skill;
      CREATE PROPERTY alternate_contact_number: std::str;
      CREATE REQUIRED PROPERTY dob: std::datetime;
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY first_name: std::str;
      CREATE PROPERTY hobbies: array<std::str>;
      CREATE REQUIRED PROPERTY last_name: std::str;
      CREATE REQUIRED PROPERTY primary_contact_number: std::str;
      CREATE REQUIRED PROPERTY profile_summary: std::str;
  };
};
