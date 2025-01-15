db.createUser(
    {
        user: "luan_van",
        pwd: "2024",
        privileges: [
            {
              resource: { db: "luan_van_2024", collection: "" },
              actions: [ "update" ]
            }
          ],
        roles: [
            {
                role: "readWrite",
                db: "luan_van_2024"
            }
        ]
    }
);