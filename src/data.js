export const base = import.meta.env.BASE_URL
export const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const mobile = typeof window !== 'undefined' && window.innerWidth < 768
export const links = { email: 'pramodmaloji96@gmail.com', github: 'https://github.com/pramodmalogi-007', linkedin: 'https://linkedin.com/in/pramod-maloji-16a37b268', resume: base + 'resume/Pramod_Maloji_Resume.pdf' }
export const nav = [['home','Home'],['about','About'],['skills','Skills'],['experience','Experience'],['projects','Projects'],['education','Education'],['contact','Contact']]
export const skills = [
 ['Languages',['Python','Java']],['Web Development',['HTML','CSS','React.js']],['Database',['SQL']],['Tools & Platforms',['Git','VS Code','XAMPP','MS Office']]]
export const soft = ['Communication','Adaptability','Time Management','Problem Solving']
export const stats = [{n:2,l:'Academic Projects'},{n:10,l:'Technical Skills'},{n:3,l:'Month Internship'},{n:7.98,l:'MCA CGPA',d:2}]
export const exp = { org:'IAMVerse', co:'TechRays Consulting Private Limited (IdentityRays)', when:'May 2026 – July 2026',
 about:'IAMVerse is an enterprise Identity and Access Management (IAM) platform that manages secure authentication, authorization and access control workflows for organizations.',
 points:['Contributed to the database systems supporting the data structures behind core IAM workflows.','Carried out functional and security testing, validating authentication flows and access-control logic prior to release.','Supported deployment and hosting activities in a production-oriented environment.'] }
export const projects = [
 { tag:'React · Big Data · AI', title:'Smart City Analysis', tech:['React.js','Python','PHP','MySQL','Big Data','AI'],
  desc:'A React.js dashboard with AI-powered predictive analytics, anomaly detection and real-time monitoring of urban systems (traffic, utilities, public safety).',
  features:['Predictive analytics & anomaly detection','CSV data upload','Chart.js visualizations','PDF export','Parking Pass module (PHP, MySQL, XAMPP): hourly/daily/monthly booking','Real-time slot tracking & QR-code receipts','Audit logs','Secure role-based access (bcrypt, prepared statements)'] },
 { tag:'Python · Django', title:'E-Quiz Learning Platform', tech:['Python','Django'],
  desc:'A web-based quiz platform applying full-stack development practices and user-centric design principles.',
  features:['Secure user login','Admin-driven quiz creation','User progress tracking','Automated certificate generation'] }]
export const edu = [['MCA','KLE Technological University, Belagavi','2026','7.98 CGPA'],['BCA','Karnataka University, Dharwad','2024','7.92 CGPA'],['PUC','Karnataka PU Board','2021','70.83%'],['SSLC','Karnataka SSLC Board','2019','80.80%']]
