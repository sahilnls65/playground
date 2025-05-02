import json

# Load your JSON schema
with open('data.json') as f:
    schema = json.load(f)

# SQL file output
output_filename = "schema_output.sql"

def generate_sql(schema):
    sql_statements = []
    
    # Iterate over all tables
    for table_name, table_def in schema.items():
        columns = table_def.get('columns', [])
        primary_key = table_def.get('primary_key')
        foreign_keys = table_def.get('foreign_keys', {})

        column_definitions = []

        for col in columns:
            col_name = col['name']
            col_type = col['type'].upper()
            not_null = 'NOT NULL' if col.get('not_null', False) else ''
            default = f"DEFAULT {col['default']}" if 'default' in col else ''
            column_definitions.append(f"  {col_name} {col_type} {not_null} {default}".strip())

        if primary_key:
            column_definitions.append(f"  PRIMARY KEY ({primary_key})")

        for fk_col, ref in foreign_keys.items():
            ref_table, ref_col = ref.split('.')
            column_definitions.append(f"  FOREIGN KEY ({fk_col}) REFERENCES {ref_table}({ref_col})")

        columns_sql = ",\n".join(column_definitions)

        create_table_sql = f"""DROP TABLE IF EXISTS {table_name} CASCADE;

CREATE TABLE {table_name} (
{columns_sql}
);
"""
        sql_statements.append(create_table_sql)

    return "\n".join(sql_statements)

# Generate SQL and write to file
sql_output = generate_sql(schema)

with open(output_filename, 'w') as f:
    f.write(sql_output)

print(f"✅ SQL schema written to {output_filename}")
