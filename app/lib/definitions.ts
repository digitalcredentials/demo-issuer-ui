
export type CredentialTypes = {
  id: 'bachelor' | 'course';
  name: "Bachelor's Degree" | "Course Credential"
};


export type ExpirationChoices = {
  id: number;
  name: 'In One Minute' | 
    'In Thirty Minutes' | 
    'In One Day'        |
    'In One Week'       |
    'In One Month'      |
    'In One Year';
  }