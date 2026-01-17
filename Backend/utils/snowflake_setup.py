import os
import snowflake.connector
from dotenv import load_dotenv

load_dotenv()

def get_snowflake_config():
    """Get Snowflake configuration with optional role and SSL settings"""
    config = {
        'user': os.getenv('SNOWFLAKE_USER'),
        'password': os.getenv('SNOWFLAKE_PASSWORD'),
        'account': os.getenv('SNOWFLAKE_ACCOUNT'),
        'warehouse': os.getenv('SNOWFLAKE_WAREHOUSE'),
        'database': os.getenv('SNOWFLAKE_DATABASE'),
        'schema': os.getenv('SNOWFLAKE_SCHEMA'),
        'insecure_mode': True,  # Disable SSL verification for testing
    }
    # Add role only if it's configured
    role = os.getenv('SNOWFLAKE_ROLE')
    if role and role != 'your_role':
        config['role'] = role
    return config

def create_tables():
    """Create Snowflake tables for document storage"""
    try:
        config = get_snowflake_config()
        conn = snowflake.connector.connect(**config)
        cursor = conn.cursor()
        
        print("Creating documents table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS documents (
                doc_id VARCHAR(255) PRIMARY KEY,
                filename VARCHAR(255),
                s3_key VARCHAR(500),
                file_size INTEGER,
                file_type VARCHAR(50),
                text_content TEXT,
                upload_timestamp TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
                status VARCHAR(50) DEFAULT 'uploaded'
            )
        """)
        
        print("Dropping existing document_chunks table if exists...")
        cursor.execute("DROP TABLE IF EXISTS document_chunks")
        
        print("Creating document_chunks table...")
        cursor.execute("""
            CREATE TABLE document_chunks (
                chunk_id VARCHAR(255) PRIMARY KEY,
                doc_id VARCHAR(255),
                chunk_text TEXT,
                chunk_index INTEGER,
                embedding_vector TEXT,  -- Store as TEXT instead of VARIANT for better compatibility
                metadata TEXT,  -- Store enhanced metadata as JSON
                created_timestamp TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
                FOREIGN KEY (doc_id) REFERENCES documents(doc_id)
            )
        """)
        
        conn.commit()
        conn.close()
        print("✅ Tables created successfully!")
        
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        raise e

if __name__ == "__main__":
    create_tables() 