CREATE MIGRATION m1fzrd5qqwmno6rcio3tlwdyfqyr7r2tuzqsamvcjxjzlqpxqv7gva
    ONTO m1ll2iqzkl3kzym4hvyl4zsxocelxwq5jagkzeiosrqyjo4zcueffq
{
  ALTER TYPE default::Project {
      ALTER LINK technologies {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
