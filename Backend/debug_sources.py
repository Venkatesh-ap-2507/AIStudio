#!/usr/bin/env python3
"""
Debug script to check source information in the database
"""

import json
from services.embedding_service import EmbeddingService
from utils.snowflake_setup import get_snowflake_connection

def check_document_chunks():
    """Check what metadata is stored in document chunks"""
    print("🔍 Checking document chunks metadata...")
    
    conn = get_snowflake_connection()
    cursor = conn.cursor()
    
    try:
        # Get sample chunks with metadata
        cursor.execute("""
            SELECT 
                dc.chunk_id,
                d.filename,
                dc.metadata,
                LEFT(dc.chunk_text, 100) as chunk_preview
            FROM document_chunks dc
            JOIN documents d ON dc.doc_id = d.doc_id
            WHERE d.status = 'processed'
            LIMIT 10
        """)
        
        chunks = cursor.fetchall()
        
        if not chunks:
            print("❌ No processed document chunks found")
            return
            
        print(f"📊 Found {len(chunks)} sample chunks:")
        
        for i, (chunk_id, filename, metadata_json, chunk_preview) in enumerate(chunks, 1):
            print(f"\n--- Chunk {i} ---")
            print(f"File: {filename}")
            print(f"Preview: {chunk_preview}...")
            
            if metadata_json:
                try:
                    metadata = json.loads(metadata_json)
                    print(f"Metadata keys: {list(metadata.keys())}")
                    print(f"Page number: {metadata.get('page_number', 'NOT SET')}")
                    print(f"Content type: {metadata.get('content_type', 'NOT SET')}")
                    print(f"Filename in metadata: {metadata.get('filename', 'NOT SET')}")
                except Exception as e:
                    print(f"Error parsing metadata: {e}")
            else:
                print("No metadata found")
                
    except Exception as e:
        print(f"Error checking chunks: {e}")
    finally:
        conn.close()

def check_documents():
    """Check what documents are in the system"""
    print("\n🔍 Checking documents in system...")
    
    conn = get_snowflake_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            SELECT doc_id, filename, status, upload_timestamp
            FROM documents
            ORDER BY upload_timestamp DESC
            LIMIT 10
        """)
        
        docs = cursor.fetchall()
        
        if not docs:
            print("❌ No documents found")
            return
            
        print(f"📊 Found {len(docs)} documents:")
        
        for doc_id, filename, status, timestamp in docs:
            print(f"- {filename} ({status}) - {timestamp}")
            
            # Count chunks for this document
            cursor.execute("""
                SELECT COUNT(*) FROM document_chunks WHERE doc_id = %s
            """, (doc_id,))
            
            chunk_count = cursor.fetchone()[0]
            print(f"  └─ {chunk_count} chunks")
                
    except Exception as e:
        print(f"Error checking documents: {e}")
    finally:
        conn.close()

def test_source_retrieval():
    """Test source retrieval with a sample query"""
    print("\n🔍 Testing source retrieval...")
    
    try:
        embedding_service = EmbeddingService()
        
        # Get current session
        session_id = embedding_service.session_manager.get_current_session_id()
        if not session_id:
            print("❌ No active session found")
            return
            
        print(f"Using session: {session_id}")
        
        # Test query
        test_query = "What is this document about?"
        
        print(f"Testing query: '{test_query}'")
        
        # Find relevant chunks
        result = await embedding_service.find_relevant_chunks(
            test_query, 
            top_k=3, 
            session_id=session_id
        )
        
        if result:
            print(f"✅ Found {len(result.get('sources', []))} sources")
            
            for i, source in enumerate(result.get('sources', []), 1):
                print(f"\nSource {i}:")
                if isinstance(source, dict):
                    print(f"  Filename: {source.get('filename', 'Unknown')}")
                    print(f"  Page: {source.get('page_number', 'Not set')}")
                    print(f"  Type: {source.get('content_type', 'Unknown')}")
                    print(f"  Similarity: {source.get('similarity', 'Unknown')}")
                else:
                    print(f"  Legacy format: {source}")
        else:
            print("❌ No sources found")
            
    except Exception as e:
        print(f"Error testing source retrieval: {e}")

if __name__ == "__main__":
    print("🚀 Starting source debugging...")
    check_documents()
    check_document_chunks()
    
    # Note: Async function needs to be run differently
    print("\n💡 To test source retrieval, run this in an async context")
    print("✅ Debug complete!")
