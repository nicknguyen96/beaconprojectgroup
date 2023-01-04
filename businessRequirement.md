## Employees
  1. Login 
        1. after log in, redirect to personal information page
        * without login, can only access log in page
  2. Registration
        1. Access only with email link and registration token
        2. provide unique(username, email) and password
        3. after signup, sign random house
  3. Navigation bar
        1. personal information
        2. visa status management
        3. housing
        4. logout
  4. Onboarding Application
        1. with status: Pending, Approved, Rejected
            1. First time: no status assigned
            2. Pending: submitted, waiting for review. Read only and download all submitted files
            3. approved: ?
            4. Rejected: read, write and download all files and resubmit
        2. input fields
        3. summary of uploaded files
  5. Personal information(organized into sections) can edit
        1. Basic(name, profile, email, ssn, dob, gender)
        2. address
        3. contact info
        4. employment
        5. emergency contact
        6. documents (with preview, download)
  6. Visa status management (only show if user select OPT)
        1. can only upload next one after current one been approved, show next step to use
        2. if approved, show next step
        3. if rejected, show show HR's feedback
        4. files order: OPT Receipt > OPT EAD > I-983 > I-20
  7. Housing
        1. address ( read only )
        2. roommates list ( list, read only )
        3. facility reports:
            1. create report 
            2. view own existing reports
            3. comments
## HR
  1. Login page 
        1. exactly the same as employee's login page. System detect their role
        2. HR is just an employee with the HR role
  2. Navigation bar
        1. home, employee profiles, visa status menagement, hiring management, housing management, logout
  3. All Employee Profiles
        1. summary of each employee's profile
            1. total number of employee, order by last name alphabetically
            2. for each employee, show basic infomation
        2. search bar
            1. search for certain employee, and show the information
            2. show matching on every key press
  4. Visa status management
        1. In Progress Employee:
            1. show all employees who are not completing all the documents
            2. show their next step
            3. HR actions for next step
                1. Approval: can approve or reject with feekback
                2. Remind: if document missing, send notification to the employee email 
        2. All Employee (read only section):
            1. employee list, show all their information. HR can previews the documents
            2. search bar, can search. show matching on every key press
  5. Hiring management
        1. generate registration token
            1. Generate token and send email
                1. token only valid for 3 hours
                2. matain a sent list with emplpyee info and if registered with the email
        2. review onboarding applications (three sections: Pending, Rejected, Approved)
            1. Pending (read and write): 
                1. List of submitted, pending onboarding applications
                2. show basic information for each application, and a view application button to view the entire application
            2. Rejected(read only section): 
                1. List of rejected application
                2. show basic information for each application, and a view application button to view the entire application
            3. Approved (read only section):
                1. List of rejected application
                2. show basic information for each application, and a view application button to view the entire application
  6. Housing management
        1. view / add / delete existing houses
        2. summary of houses
            1. house info and resident info
        3. provide address, landlord info, house info for add new house
