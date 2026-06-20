const UNIVERSITIES = [
    {
        id: "rwth-aachen",
        university: "RWTH Aachen University",
        city: "Aachen",
        lat: 50.7753,
        lng: 6.0839,
        programs: [
            { name: "Software Systems Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3696/" },
            { name: "Computer Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5226/" },
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/7636/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Cologne 70km", "Düsseldorf 80km", "Brussels 160km"],
        jobMarket: "good",
        difficulty: "very-hard",
        avgSalaryCS: 4500,
        notes: "Workload is extreme — students warn there is no time for a part-time job. Exams require months of prep.",
        status: "not-researched"
    },
    {
        id: "uni-augsburg",
        university: "University of Augsburg",
        city: "Augsburg",
        lat: 48.3705,
        lng: 10.8978,
        programs: [
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9965/" },
            { name: "Mathematics and Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10558/" }
        ],
        deadline: "September 1",
        deadlineDate: "2026-09-01",
        dormCost: null,
        nearCities: ["Munich 65km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 4200,
        notes: "Most good jobs are in Munich nearby. Augsburg itself is overshadowed.",
        status: "not-researched"
    },
    {
        id: "uni-bamberg",
        university: "University of Bamberg",
        city: "Bamberg",
        lat: 49.8988,
        lng: 10.9028,
        programs: [
            { name: "International Software Systems Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4521/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Nuremberg 60km"],
        jobMarket: "low",
        difficulty: "medium",
        avgSalaryCS: 4000,
        notes: "Small tech scene, mainly social sciences focus. Jobs likely require commuting to Nuremberg.",
        status: "not-researched"
    },
    {
        id: "uni-bayreuth",
        university: "University of Bayreuth",
        city: "Bayreuth",
        lat: 49.9457,
        lng: 11.5713,
        programs: [
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5245/" },
            { name: "Philosophy and Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9583/" }
        ],
        deadline: "October 15",
        deadlineDate: "2026-10-15",
        dormCost: null,
        nearCities: ["Nuremberg 80km"],
        jobMarket: "low",
        difficulty: "medium",
        avgSalaryCS: 3900,
        notes: "Smaller city, limited local tech jobs. English roles mostly reachable via Nuremberg.",
        status: "not-researched"
    },
    {
        id: "uni-bielefeld",
        university: "Bielefeld University",
        city: "Bielefeld",
        lat: 52.0302,
        lng: 8.5325,
        programs: [
            { name: "Intelligent Interactive Systems", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9646/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Hanover 100km", "Dortmund 90km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 4100,
        notes: "Growing tech sector but limited English-only roles locally.",
        status: "not-researched"
    },
    {
        id: "rub-bochum",
        university: "Ruhr-Universität Bochum",
        city: "Bochum",
        lat: 51.4818,
        lng: 7.2162,
        programs: [
            { name: "Computational Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3847/" },
            { name: "Cognitive Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4356/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Dortmund 25km", "Cologne 75km", "Düsseldorf 45km"],
        jobMarket: "good",
        difficulty: "hard",
        avgSalaryCS: 4400,
        notes: "Strong Ruhr area digital transformation hub. IT and cybersecurity focus.",
        status: "not-researched"
    },
    {
        id: "uni-bonn",
        university: "University of Bonn",
        city: "Bonn",
        lat: 50.7374,
        lng: 7.0982,
        programs: [
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/7606/" },
            { name: "Human-Centred Intelligent Systems", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3728/" }
        ],
        deadline: "September 15",
        deadlineDate: "2026-09-15",
        dormCost: null,
        nearCities: ["Cologne 30km", "Düsseldorf 70km"],
        jobMarket: "good",
        difficulty: "relaxed",
        avgSalaryCS: 4300,
        notes: "Relaxed atmosphere, flexible program, students describe it as low-stress with time to work part-time. UN orgs and AI research boost English job scene.",
        status: "not-researched"
    },
    {
        id: "tu-braunschweig",
        university: "TU Braunschweig",
        city: "Braunschweig",
        lat: 52.2689,
        lng: 10.5268,
        programs: [
            { name: "Computational Sciences in Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3685/" },
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/7660/" },
            { name: "Quantum Technologies in ECE", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8958/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Hanover 55km", "Hamburg 200km"],
        jobMarket: "medium",
        difficulty: "hard",
        avgSalaryCS: 4100,
        notes: "Technical university — expect higher workload than average. Fraunhofer institutes nearby.",
        status: "not-researched"
    },
    {
        id: "tu-chemnitz",
        university: "Chemnitz University of Technology",
        city: "Chemnitz",
        lat: 50.8278,
        lng: 12.9214,
        programs: [
            { name: "Web Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4655/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Dresden 75km", "Leipzig 80km"],
        jobMarket: "low",
        difficulty: "hard",
        avgSalaryCS: 3700,
        notes: "Technical university with higher workload. City has struggled economically, limited English roles.",
        status: "not-researched"
    },
    {
        id: "btu-cottbus",
        university: "BTU Cottbus-Senftenberg",
        city: "Cottbus",
        lat: 51.7606,
        lng: 14.3329,
        programs: [
            { name: "Artificial Intelligence", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8322/" }
        ],
        deadline: "August 15",
        deadlineDate: "2026-08-15",
        dormCost: null,
        nearCities: ["Berlin 120km", "Dresden 150km"],
        jobMarket: "low",
        difficulty: "medium",
        avgSalaryCS: 3800,
        notes: "Region transitioning from coal to tech — future potential but very small English job market now.",
        status: "not-researched"
    },
    {
        id: "tu-darmstadt",
        university: "TU Darmstadt",
        city: "Darmstadt",
        lat: 49.8728,
        lng: 8.6512,
        programs: [
            { name: "Artificial Intelligence and Machine Learning", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4258/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Frankfurt 35km", "Mannheim 75km"],
        jobMarket: "high",
        difficulty: "very-hard",
        avgSalaryCS: 4600,
        notes: "May require on-campus entrance exam. Very intense program. ESA, Fraunhofer, major IT companies nearby.",
        status: "not-researched"
    },
    {
        id: "fh-dortmund",
        university: "Dortmund UAS",
        city: "Dortmund",
        lat: 51.5136,
        lng: 7.4653,
        programs: [
            { name: "Digital Transformation", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4879/" },
            { name: "Embedded Systems Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4513/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Bochum 25km", "Cologne 75km", "Düsseldorf 60km"],
        jobMarket: "good",
        difficulty: "medium",
        avgSalaryCS: 4200,
        notes: "Applied sciences university — more practical, less theory-heavy. Growing startup scene.",
        status: "not-researched"
    },
    {
        id: "tu-dresden",
        university: "TU Dresden",
        city: "Dresden",
        lat: 51.0259,
        lng: 13.7222,
        programs: [
            { name: "Computational Modelling and Simulation", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5202/" },
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10354/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Leipzig 110km", "Berlin 200km", "Prague 150km"],
        jobMarket: "good",
        difficulty: "hard",
        avgSalaryCS: 4000,
        notes: "TU9 university — students report program is stressful. Silicon Saxony semiconductor hub nearby.",
        status: "not-researched"
    },
    {
        id: "hhu-dusseldorf",
        university: "Heinrich Heine University Düsseldorf",
        city: "Düsseldorf",
        lat: 51.1872,
        lng: 6.7942,
        programs: [
            { name: "Artificial Intelligence and Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/6937/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Cologne 45km", "Dortmund 75km"],
        jobMarket: "good",
        difficulty: "medium",
        avgSalaryCS: 4500,
        notes: "Not a technical university — generally less intense. Strong finance/business IT sector in the city.",
        status: "not-researched"
    },
    {
        id: "fau-erlangen",
        university: "FAU Erlangen-Nürnberg",
        city: "Erlangen",
        lat: 49.5975,
        lng: 11.0045,
        programs: [
            { name: "Computational Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3727/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Nuremberg 15km", "Munich 165km"],
        jobMarket: "high",
        difficulty: "hard",
        avgSalaryCS: 4400,
        notes: "Siemens HQ is here. One of Germany's highest concentrations of tech jobs. Expect solid workload.",
        status: "not-researched"
    },
    {
        id: "tuhh-hamburg",
        university: "Hamburg University of Technology",
        city: "Hamburg",
        lat: 53.4637,
        lng: 9.9694,
        programs: [
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9040/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Lübeck 65km", "Rostock 190km", "Berlin 290km"],
        jobMarket: "high",
        difficulty: "hard",
        avgSalaryCS: 4800,
        notes: "Technical university — harder workload. Hamburg is very international, huge logistics/e-commerce/media tech sector.",
        status: "not-researched"
    },
    {
        id: "luh-hannover",
        university: "Leibniz University Hannover",
        city: "Hannover",
        lat: 52.3813,
        lng: 9.7173,
        programs: [
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8935/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Hamburg 160km", "Berlin 280km", "Braunschweig 55km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 4300,
        notes: "Major trade fair city with solid IT market. Not very international but decent job prospects.",
        status: "not-researched"
    },
    {
        id: "uni-hildesheim",
        university: "University of Hildesheim",
        city: "Hildesheim",
        lat: 52.1504,
        lng: 9.9523,
        programs: [
            { name: "Software Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8417/" },
            { name: "Data Analytics", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5561/" }
        ],
        deadline: "August 15",
        deadlineDate: "2026-08-15",
        dormCost: null,
        nearCities: ["Hanover 30km"],
        jobMarket: "low",
        difficulty: "medium",
        avgSalaryCS: 3900,
        notes: "Small local market — jobs mostly require commuting to Hannover.",
        status: "not-researched"
    },
    {
        id: "tu-ilmenau",
        university: "TU Ilmenau",
        city: "Ilmenau",
        lat: 50.6837,
        lng: 10.9196,
        programs: [
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10469/" },
            { name: "Research in Computer & Systems Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4092/" },
            { name: "MSc Communications and Signal Processing", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3979/" }
        ],
        deadline: "September 15",
        deadlineDate: "2026-09-15",
        dormCost: null,
        nearCities: ["Erfurt 50km"],
        jobMarket: "medium",
        difficulty: "hard",
        avgSalaryCS: 3800,
        notes: "Strong technical university with niche research focus. Small town, limited social scene.",
        status: "not-researched"
    },
    {
        id: "rptu-kaiserslautern",
        university: "RPTU Kaiserslautern-Landau",
        city: "Kaiserslautern",
        lat: 49.4401,
        lng: 7.7491,
        programs: [
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3629/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Frankfurt 120km", "Mannheim 60km"],
        jobMarket: "good",
        difficulty: "hard",
        avgSalaryCS: 4000,
        notes: "Large Fraunhofer IESE institute on campus. Strong CS and IT research hub. Solid workload.",
        status: "not-researched"
    },
    {
        id: "kiel-uni",
        university: "Kiel University",
        city: "Kiel",
        lat: 54.3213,
        lng: 10.1349,
        programs: [
            { name: "MSc Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/6148/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Hamburg 90km", "Lübeck 65km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 4100,
        notes: "University city with maritime tech niche. Less international than Hamburg.",
        status: "not-researched"
    },
    {
        id: "fh-kiel",
        university: "Kiel University of Applied Sciences",
        city: "Kiel",
        lat: 54.3245,
        lng: 10.1390,
        programs: [
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9058/" },
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8285/" }
        ],
        deadline: "September 15",
        deadlineDate: "2026-09-15",
        dormCost: null,
        nearCities: ["Hamburg 90km", "Lübeck 65km"],
        jobMarket: "medium",
        difficulty: "relaxed",
        avgSalaryCS: 3900,
        notes: "Applied sciences university — practical and structured, less theory-heavy. Good work-life balance.",
        status: "not-researched"
    },
    {
        id: "uni-koblenz",
        university: "University of Koblenz",
        city: "Koblenz",
        lat: 50.3569,
        lng: 7.5890,
        programs: [
            { name: "Web and Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4384/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Frankfurt 100km", "Cologne 100km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 4000,
        notes: "Good Web & Data Science reputation. Not a tech giant city but some government and IT presence.",
        status: "not-researched"
    },
    {
        id: "uni-cologne",
        university: "University of Cologne",
        city: "Köln",
        lat: 50.9282,
        lng: 6.9295,
        programs: [
            { name: "Computational Sciences", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8352/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Düsseldorf 45km", "Bonn 30km", "Aachen 75km"],
        jobMarket: "good",
        difficulty: "relaxed",
        avgSalaryCS: 4500,
        notes: "Not a technical university — generally less intense workload. Large diverse city with solid IT sector.",
        status: "not-researched"
    },
    {
        id: "uni-lubeck",
        university: "Universität zu Lübeck",
        city: "Lübeck",
        lat: 53.8655,
        lng: 10.6866,
        programs: [
            { name: "IT Security", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9072/" },
            { name: "Artificial Intelligence", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9003/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Hamburg 65km", "Kiel 65km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 4100,
        notes: "Strong niche in medical tech and IT security. Smaller market but specialized roles available.",
        status: "not-researched"
    },
    {
        id: "ovgu-magdeburg",
        university: "Otto von Guericke University Magdeburg",
        city: "Magdeburg",
        lat: 52.1205,
        lng: 11.6276,
        programs: [
            { name: "Computational Methods in Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9061/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Berlin 140km", "Hanover 150km"],
        jobMarket: "medium",
        difficulty: "hard",
        avgSalaryCS: 3900,
        notes: "Fraunhofer IFF institute here. Growing hub but still smaller market. Solid engineering workload.",
        status: "not-researched"
    },
    {
        id: "uni-marburg",
        university: "Marburg University",
        city: "Marburg",
        lat: 50.8021,
        lng: 8.7703,
        programs: [
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9046/" },
            { name: "Business Informatics", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9043/" },
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9042/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Frankfurt 100km", "Kassel 100km"],
        jobMarket: "low",
        difficulty: "relaxed",
        avgSalaryCS: 4100,
        notes: "Classic student city, relaxed atmosphere. Non-technical university, lighter workload. Local job market small — commute to Frankfurt.",
        status: "not-researched"
    },
    {
        id: "uni-munster",
        university: "University of Münster",
        city: "Münster",
        lat: 51.9607,
        lng: 7.6261,
        programs: [
            { name: "MSc Information Systems", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4010/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Dortmund 65km", "Osnabrück 60km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 4200,
        notes: "Large university, decent IT sector. Not a top tech hub but stable.",
        status: "not-researched"
    },
    {
        id: "uni-oldenburg",
        university: "University of Oldenburg",
        city: "Oldenburg",
        lat: 53.1435,
        lng: 8.2145,
        programs: [
            { name: "Data Science and Machine Learning", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/9906/" },
            { name: "Engineering of Socio-Technical Systems", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/7040/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Bremen 50km", "Hamburg 150km"],
        jobMarket: "low",
        difficulty: "medium",
        avgSalaryCS: 4000,
        notes: "Smaller city, limited English-speaking roles locally. Bremen nearby offers more options.",
        status: "not-researched"
    },
    {
        id: "uni-paderborn",
        university: "Paderborn University",
        city: "Paderborn",
        lat: 51.7189,
        lng: 8.7575,
        programs: [
            { name: "Computer Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5616/" },
            { name: "Computer Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5625/" }
        ],
        deadline: "September 21",
        deadlineDate: "2026-09-21",
        dormCost: null,
        nearCities: ["Bielefeld 45km", "Dortmund 100km"],
        jobMarket: "good",
        difficulty: "relaxed",
        avgSalaryCS: 4000,
        notes: "Surprisingly strong tech hub with Heinz Nixdorf Institute. High concentration of tech companies for its size. Workload manageable.",
        status: "not-researched"
    },
    {
        id: "fh-rheinmain",
        university: "RheinMain University of Applied Sciences",
        city: "Rüsselsheim",
        lat: 49.9949,
        lng: 8.4160,
        programs: [
            { name: "AI and Advanced Information Technology", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10568/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Frankfurt 25km", "Darmstadt 20km"],
        jobMarket: "high",
        difficulty: "relaxed",
        avgSalaryCS: 4400,
        notes: "Applied sciences university — practical focus, lighter workload. Proximity to Frankfurt makes job market excellent.",
        status: "not-researched"
    },
    {
        id: "uni-saarland",
        university: "Saarland University",
        city: "Saarbrücken",
        lat: 49.2354,
        lng: 6.9969,
        programs: [
            { name: "Media Informatics", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4634/" }
        ],
        deadline: "July 15",
        deadlineDate: "2026-07-15",
        dormCost: null,
        nearCities: ["Luxembourg 95km", "Frankfurt 180km"],
        jobMarket: "good",
        difficulty: "medium",
        avgSalaryCS: 4000,
        notes: "Top CS/AI research center — Max Planck and DFKI institutes on campus. Mandatory internship in program.",
        status: "not-researched"
    },
    {
        id: "hbrs-sanktaugustin",
        university: "Hochschule Bonn-Rhein-Sieg",
        city: "Sankt Augustin",
        lat: 50.7718,
        lng: 7.1881,
        programs: [
            { name: "Game Technologies", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/10332/" }
        ],
        deadline: "September 15",
        deadlineDate: "2026-09-15",
        dormCost: null,
        nearCities: ["Bonn 15km", "Cologne 30km"],
        jobMarket: "good",
        difficulty: "relaxed",
        avgSalaryCS: 4200,
        notes: "Applied sciences university, project-based and practical. Fraunhofer IAIS nearby. Bonn/Cologne job market accessible.",
        status: "not-researched"
    },
    {
        id: "uni-trier",
        university: "Trier University",
        city: "Trier",
        lat: 49.7488,
        lng: 6.6371,
        programs: [
            { name: "Data Science", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/5351/" }
        ],
        deadline: "September 15",
        deadlineDate: "2026-09-15",
        dormCost: null,
        nearCities: ["Luxembourg 50km", "Saarbrücken 90km"],
        jobMarket: "low",
        difficulty: "medium",
        avgSalaryCS: 3900,
        notes: "Beautiful small city, very limited CS job market. Luxembourg nearby has some cross-border opportunities.",
        status: "not-researched"
    },
    {
        id: "bauhaus-weimar",
        university: "Bauhaus-Universität Weimar",
        city: "Weimar",
        lat: 50.9798,
        lng: 11.3294,
        programs: [
            { name: "Computer Science for Digital Media", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4238/" },
            { name: "Human-Computer Interaction", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/4660/" },
            { name: "Digital Engineering", link: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/8265/" }
        ],
        deadline: "September 30",
        deadlineDate: "2026-09-30",
        dormCost: null,
        nearCities: ["Erfurt 20km", "Jena 25km"],
        jobMarket: "medium",
        difficulty: "medium",
        avgSalaryCS: 3800,
        notes: "Unique media/design-tech niche. Small city but strong identity. Specific media-tech jobs available.",
        status: "not-researched"
    }
];

window.UNIVERSITIES = UNIVERSITIES;