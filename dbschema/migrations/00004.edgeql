CREATE MIGRATION m1kfve3ww5rzifhgxe64lomepzircmso7qylzfeychajwpt2tu2xsq
    ONTO m17sdszdp5xjnaoy6d725kiijqd7732nhqlxzefzhfyajn5ihermyq
{
  ALTER TYPE default::Career {
      ALTER LINK projects {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  ALTER TYPE default::Education {
      ALTER LINK projects {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  ALTER TYPE default::Project {
      ALTER LINK technologies {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
};
