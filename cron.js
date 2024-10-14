document.getElementById("title").innerHTML = "cron";

const education_levels = {
  Elementair: "Basisonderwijs",
  VMBO: "MAVO/VMBO",
  "VMBO/MBO": "MAVO/VMBO",
  "MAVO/VMBO": "MAVO/VMBO",
  "MAVO/HAVO": "HAVO",
  HAVO: "HAVO",
  "HAVO/VWO": "VWO",
  VWO: "VWO",
  MBO: "MBO",
  "MBO/HBO": "MBO/HBO",
  HBO: "HBO",
  "HBO/WO": "HBO/WO",
  WO: "WO",
  Post_WO: "WO",
  Onbekend: "Geen",
};

async function textkernelAddOpdrachtCron() {
  //   const nowDate = new Date();
  //   nowDate.setDate(nowDate.getDate() + 10);
  //   const now_data = nowDate.toISOString().split("T")[0];

  /** Get Jobfeed Options */
  const jobfeedOption = {
    url: "https://www.jobfeed.nl/api/v3/search",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic dXNnZnJlZWxhbmNlOllvdW5pdGVkcGxhdGZvcm0=",
    },
    data: {
      advertiser_type: "1",
      "posting:expired": "false",
      "job:contract_type": "2|3|4|6|9",
      _limit: "6000",
      _language: "nl",
      _pretty: "1",
      full_text: '((ZZP* OR Freelanc*) NOT ("geen ZZP" OR "alleen een loondienstverband"))',
      "posting:source_website__prefix__none":
        "freelancer|freelance|jobbird|hoofdkraan|freep|intermediair|jellow",
    },
  };

  console.log(jobfeedOption);
  const jobfeeds = await executeAxios(jobfeedOption);

  console.log("jobfeeds", jobfeeds);
  return;
  for (const jobfeed of jobfeeds) {
    const formattedSkills = [];

    let lat = 0;
    let lang = 0;

    if (jobfeed.location_coordinates && jobfeed.location_coordinates !== "") {
      const latLong = jobfeed.location_coordinates.split(",");
      if (latLong.length > 0) {
        lat = parseFloat(latLong[0]);
        lang = parseFloat(latLong[1]);
      }
    }

    /** soft_skills */
    if (jobfeed.soft_skills) {
      const softSkills = generateSkillFormat("soft_skills", jobfeed.soft_skills);
      formattedSkills.push(...softSkills);
    }
    /** professional_skills */
    if (jobfeed.professional_skills) {
      const professionalSkills = generateSkillFormat(
        "professional_skills",
        jobfeed.professional_skills
      );
      formattedSkills.push(...professionalSkills);
    }
    /** it_skills */
    if (jobfeed.it_skills) {
      const itSkills = generateSkillFormat("it_skills", jobfeed.it_skills);
      formattedSkills.push(...itSkills);
    }
    /** language_skills */
    if (jobfeed.language_skills) {
      const languageSkills = generateSkillFormat("language_skills", jobfeed.language_skills);
      formattedSkills.push(...languageSkills);
    }

    const json_data = {
      opdracht: {
        jobfeedid: jobfeed.job_id,
        jobfeeduniquename: "Textkernal",
        order: "2",
        startdatumopdracht: now_data,
        plaatsvanopdracht: jobfeed.location_name ? encodeString(jobfeed.location_name) : "",
        aantalurenperiode: "Per Week",
        aantaluurperweek: jobfeed.hours_per_week_from ? jobfeed.hours_per_week_from : "",
        maximumaantaluurperweek: jobfeed.hours_per_week_to ? jobfeed.hours_per_week_to : "",
        bedrijfsnaam: jobfeed.organization_name ? encodeString(jobfeed.organization_name) : "",
        naamopdracht: jobfeed.job_title ? encodeString(jobfeed.job_title) : "",
        opdrachttype: "Duur onbekend",
        status: "Open",
        sector: jobfeed.organization_industry.label ? jobfeed.organization_industry.label : "",
        url: jobfeed.source_url ? encodeString(jobfeed.source_url) : "",
        uurtarief: 35,
        uurtariefmax: 250,
        werklocatielng: lang,
        werklocatielat: lat,
        opdrachtlite: true,
        professionDescription: jobfeed.profession.label
          ? jobfeed.profession.label.replace("'", "`")
          : "",
        opleidingsniveau: jobfeed.education_level.label
          ? education_levels[jobfeed.education_level.label]
          : "",
      },
      skills: {
        selected_skillcodes: formattedSkills,
      },
      zichtbaarheid: {
        zichtbaar: true,
        zichtbaarvanaf: now_data,
        zichtbaartot: new Date(nowDate.getFullYear() + 1, nowDate.getMonth(), nowDate.getDate())
          .toISOString()
          .split("T")[0],
      },
    };
  }
}

async function executeAxios(options) {
  try {
    const response = await window.axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

function generateSkillFormat(category, skills) {
  return skills.map((skill) => ({
    code_id: skill.value,
    category: category,
    is_other: false,
    description: skill.label.replace("'", "`"),
  }));
}

const data = textkernelAddOpdrachtCron();
console.log(data);
console.log("first");
