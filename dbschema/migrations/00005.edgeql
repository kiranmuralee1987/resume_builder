CREATE MIGRATION m1ll2iqzkl3kzym4hvyl4zsxocelxwq5jagkzeiosrqyjo4zcueffq
    ONTO m1kfve3ww5rzifhgxe64lomepzircmso7qylzfeychajwpt2tu2xsq
{
  ALTER TYPE default::Candidate {
      ALTER LINK career_details {
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK education_details {
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK skills {
          ON TARGET DELETE ALLOW;
          SET MULTI;
      };
  };
};
