def get_db_schema_name(agent_id: str):
    return "ag_"+agent_id.replace("-","_")