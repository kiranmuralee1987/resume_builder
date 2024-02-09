
import * as edgedb from "edgedb";
import e from "./dbschema/edgeql-js";
const client = edgedb.createClient();

export const GET = async () => {
  const query = e.select(e.Technology, ()=>({
    name: true
  }))
  const message = await query.run(client) 
  return new Response(JSON.stringify({message}), { status:200})
}

export const PUT = async ({ request }) => {
  const body = await request.json()
  const { id, address, first_name, last_name, dob, primary_contact_number, alternate_contact_number, hobbies, profile_summary, certificates,career_details, education_details} =body.candidate_details
const {address1, address2, city, location_name, state, zipcode} = address
 
  const candidateLinkFields = await e.select(e.Candidate, candidate =>({
  certificates: true,
  education_details: true,
  career_details: true,
  filter_single: e.op(candidate.id, "=", e.uuid(id))
  })).run(client)

  e.update(e.Address, addressVal => ({
    filter_single: e.op(addressVal.id, "=", e.uuid(address.id)),
    set: {
      address1,
      address2,
      city,
      location_name,
      state,
      zipcode
    }
  })).run(client)

  e.params({ ids: e.array(e.uuid) }, (params) => {
    return e.delete(e.Certificate, certificate =>({
      filter: e.op(certificate.id, "in",e.array_unpack(params.ids))
    }))
  }).run(client,{
    ids:candidateLinkFields.certificates.map(e=>e.id)
  })

  e.params({ ids: e.array(e.uuid) }, (params) => {
    return e.delete(e.Education, education =>({
      filter: e.op(education.id, "in",e.array_unpack(params.ids))
    }))
  }).run(client,{
    ids:candidateLinkFields.education_details.map(e=>e.id)
  })

  e.params({ ids: e.array(e.uuid) }, (params) => {
    return e.delete(e.Career, career =>({
      filter: e.op(career.id, "in",e.array_unpack(params.ids))
    }))
  }).run(client,{
    ids:candidateLinkFields.career_details.map(e=>e.id)
  })

  const candidateCertificates= await e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Certificate, {
        title: e.cast(e.str, item.title),
        url: e.cast(e.str, item.url),
      });
    });
  }).run(client, {items:certificates})

  const candidateCareerDetails= await e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      
      const careerProjects= e.for(e.json_array_unpack(item.projects), (projectItem) => {
        const tech = e.for(e.json_array_unpack(projectItem.technologies), (technology) => {
          let result =  e.insert(e.Technology, {
            name: e.cast(e.str, technology.name)
          })
          return result
        })        
          return e.insert(e.Project, {
            project_name: e.cast(e.str, projectItem.project_name),
            project_description: e.cast(e.str, projectItem.project_description),
            technologies: e.select(tech)
          });
        })
      return e.insert(e.Career, {
        company_location: e.cast(e.str, item.company_location),
        company_name: e.cast(e.str, item.company_name),
        job_role: e.cast(e.str, item.job_role),
        joining_month: e.cast(e.str, item.joining_month),
        joining_year: e.cast(e.str, item.joining_year),
        releiving_month: e.cast(e.str, item.releiving_month),
        releiving_year: e.cast(e.str, item.releiving_year),
        projects: e.select(careerProjects)
      });
    });
  }).run(client, {items:career_details})


  
  const candidateEducationDetails= await e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
     
      const educationprojects= e.for(e.json_array_unpack(item.projects), (projectItem) => {

        const tech = e.for(e.json_array_unpack(projectItem.technologies), (technology) => {
          let result =  e.insert(e.Technology, {
            name: e.cast(e.str, technology.name)
          })
          // if(technology.id)
          // result = e.select(e.Technology, (technologyVal) =>({
          //   filter_single: e.op(technologyVal.id, "=", e.cast(e.uuid,'074e0a04-c4d3-11ee-a183-97983400b476'))
          // }))
          return result
        })
        
          return e.insert(e.Project, {
            project_name: e.cast(e.str, projectItem.project_name),
            project_description: e.cast(e.str, projectItem.project_description),
            technologies: e.select(tech)
          });
        })
  
      return  e.insert(e.Education, {
        institution_name: e.cast(e.str, item.institution_name),
        course_name: e.cast(e.str, item.course_name),
        pass_percentage: e.cast(e.str, item.pass_percentage),
        course_start_month: e.cast(e.str, item.course_start_month),
        course_end_month: e.cast(e.str, item.course_end_month),
        course_start_year: e.cast(e.str, item.course_start_year),
        course_end_year: e.cast(e.str, item.course_end_year),
        projects:e.select(educationprojects)
      });
    });
  }).run(client, {items:education_details})


  e.update(e.Candidate, (candidate) => ({
    filter: e.op(candidate.id, "=", e.uuid(id)),
    set: {
      first_name,
      last_name,
      dob:e.str(dob),
      primary_contact_number,
      alternate_contact_number,
      hobbies,
      profile_summary,
      certificates: { "+=": e.select(e.Certificate, (certificate) => ({
         filter:e.op(certificate.id, 'in', e.array_unpack(e.literal(e.array(e.uuid), candidateCertificates.map(e=>e.id))) )
      }))},
      education_details: { "+=": e.select(e.Education, (education) => ({
        filter:e.op(education.id, 'in', e.array_unpack(e.literal(e.array(e.uuid), candidateEducationDetails.map(e=>e.id))) )
     }))},
     career_details: { "+=": e.select(e.Career, (career) => ({
      filter:e.op(career.id, 'in', e.array_unpack(e.literal(e.array(e.uuid), candidateCareerDetails.map(e=>e.id))) )
   }))}
    }
  })).run(client)

  return new Response(JSON.stringify({message:'success'}), { status:201 })
}

export const POST = async ({ request }) => {
  const body = await request.json()

  const projectDetails = body?.project_details
  const technologyDetails = projectDetails[0]?.technologies || []

  //const userBasicDetails = body?.user_basic_details || {}

  const insertTechnologyDetails = technologyDetails?.filter( technology => !technology?.id )
  console.log('insertTechnologyDetails', insertTechnologyDetails)

  const technologyInsertQuery = e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Technology, {
        name: e.cast(e.str, item.name)
      })
    })
  })
  
  const result = await technologyInsertQuery.run(client, {
    items: insertTechnologyDetails
  })

  console.log('result', result)


  const projectsInsertQuery = e.params({ items: e.json, ids: e.array(e.uuid) }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Project, {
        project_name: e.cast(e.str, item.project_name),
        project_description: e.cast(e.str, item.project_description),
        technologies: e.select(e.Technology, (technology) => ({
          filter: e.op(technology.id, 'in', e.array_unpack(params.ids))
        })) 
      })
    })
  })

  const result1 = await projectsInsertQuery.run(client, {
    items: projectDetails.map(e => {return {'project_name': e.project_name, 'project_description': e.project_description}}),
    ids: result.map(e => e.id)
  })

  console.log('result1', result1)

  // const query = e.insert(e.candidate, {
  //   first_name: userBasicDetails?.first_name || '',
  //   last_name: userBasicDetails?.last_name || '',
  //   email: userBasicDetails?.email || '',
  //   dob: userBasicDetails?.dob || '',
  //   primary_contact_number: userBasicDetails?.primary_contact_number || '',
  //   alternate_contact_number: userBasicDetails?.alternate_contact_number || '',
  //   hobbies: userBasicDetails?.hobbies || '',
  //   profile_summary:userBasicDetails?.profile_summary || '',
  // })

  //const result = query.run(client)
  return new Response(JSON.stringify({message:'success'}), { status:201 })
}