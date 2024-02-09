module default {
    type Candidate {
        required first_name: str;
        required last_name: str;
        required dob: str;
        required profile_summary: str;
        required primary_contact_number: str;
        alternate_contact_number: str;
        required email: str;
        hobbies: array <str>;
        multi education_details: Education {
            on target delete allow;
        };;
        multi career_details: Career {
            on target delete allow;
        };
        address: Address;
        multi skills: Skill {
            on target delete allow;
        };
        multi certificates: Certificate {
            on target delete allow;
        };
    }
    type Address {
        required address1: str;
        address2: str;
        location_name: str;
        required city: str;
        required state: str;
        required zipcode: str;
    }
    type Education {
        required course_name: str;
        required institution_name: str;
        required course_start_month: str;
        required course_start_year: str;
        required course_end_month: str;
        required course_end_year: str;
        pass_percentage: str;
        multi projects: Project {
            on source delete delete target;
        };
    }
    type Career {
        required company_name: str;
        required company_location: str;
        multi projects: Project {
            on source delete delete target;
        };
        required job_role: str;
        joining_month: str;
        joining_year: str;
        releiving_month: str;
        releiving_year: str;
    }
    type Project {
        required project_name: str;
        required project_description: str;
        multi technologies: Technology {
            on target delete allow;
        };
    }
    type Technology {
        name: str;
    }
    type Skill {
        technology: Technology;
        rating: int16;
    }
    type Certificate {
        title: str;
        url: str;
    }
}
