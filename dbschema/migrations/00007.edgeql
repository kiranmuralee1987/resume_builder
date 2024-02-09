CREATE MIGRATION m16rfrbv5u47p7onz7xmslpfgb3chmcy5prvyvgnhirsoahvdyxulq
    ONTO m1fzrd5qqwmno6rcio3tlwdyfqyr7r2tuzqsamvcjxjzlqpxqv7gva
{
  ALTER TYPE default::Project {
      ALTER LINK technologies {
          RESET ON SOURCE DELETE;
          ON TARGET DELETE ALLOW;
      };
  };
};
