CREATE MIGRATION m1tit3ft6lkl5kqo2ryl6zhk3bhwdh62z4faf4dbmd2lnwqsjd3yoa
    ONTO m1hqvcozgf43amvyrchujv3jraliind5rizw5zlfhhqaogbea2vwva
{
  ALTER TYPE default::Candidate {
      ALTER PROPERTY dob {
          SET TYPE std::str USING (<std::str>.dob);
      };
  };
};
