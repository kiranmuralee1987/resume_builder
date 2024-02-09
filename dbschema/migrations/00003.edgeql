CREATE MIGRATION m17sdszdp5xjnaoy6d725kiijqd7732nhqlxzefzhfyajn5ihermyq
    ONTO m1tit3ft6lkl5kqo2ryl6zhk3bhwdh62z4faf4dbmd2lnwqsjd3yoa
{
  ALTER TYPE default::Candidate {
      ALTER LINK certificates {
          ON TARGET DELETE ALLOW;
      };
  };
};
