#!/usr/bin/env python3
"""
Test script to verify that the transcribe endpoint correctly handles document_mode parameter
"""

import asyncio
import io
import wave
import struct
import requests
import json
from fastapi.testclient import TestClient
from main import app


def create_test_audio():
    """Create a simple test audio file in memory"""
    # Create a simple sine wave audio for testing
    sample_rate = 44100
    duration = 1  # 1 second
    frequency = 440  # A4 note

    # Generate sine wave
    frames = []
    for i in range(int(sample_rate * duration)):
        value = int(32767 * 0.3 * (i % (sample_rate // frequency)
                                   ) / (sample_rate // frequency))
        frames.append(struct.pack('<h', value))

    # Create WAV file in memory
    audio_buffer = io.BytesIO()
    with wave.open(audio_buffer, 'wb') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 2 bytes per sample
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(b''.join(frames))

    audio_buffer.seek(0)
    return audio_buffer.getvalue()


def test_transcribe_endpoint():
    """Test the transcribe endpoint with both document modes"""
    client = TestClient(app)

    # Create test audio
    audio_data = create_test_audio()

    print("🧪 Testing transcribe endpoint...")

    # Test 1: LLM-only mode (document_mode=False)
    print("\n📝 Test 1: LLM-only mode (document_mode=False)")
    try:
        response = client.post(
            "/transcribe",
            files={"audio": ("test.wav", audio_data, "audio/wav")},
            data={"document_mode": "false"}
        )
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Response keys: {list(result.keys())}")
            print(f"Transcript: {result.get('transcript', 'N/A')}")
            print(f"Response: {result.get('response', 'N/A')[:100]}...")
            print(f"Document Mode: {result.get('document_mode', False)}")
            print(f"Context Used: {result.get('context_used', False)}")

            sources = result.get('sources', [])
            if sources:
                print(f"Sources ({len(sources)}):")
                for i, source in enumerate(sources, 1):
                    if isinstance(source, dict):
                        filename = source.get('filename', 'Unknown')
                        page = source.get('page_number', 'N/A')
                        similarity = source.get('similarity', 0)
                        content_type = source.get('content_type', 'text')
                        print(
                            f"  {i}. {filename} (Page {page}) - {content_type} - {similarity:.2f}")
                    else:
                        print(f"  {i}. {source}")
            else:
                print("No sources returned")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error in LLM-only mode test: {e}")

    # Test 2: Document mode (document_mode=True)
    print("\n📄 Test 2: Document mode (document_mode=True)")
    try:
        response = client.post(
            "/transcribe",
            files={"audio": ("test.wav", audio_data, "audio/wav")},
            data={"document_mode": "true"}
        )
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Response keys: {list(result.keys())}")
            print(f"Transcript: {result.get('transcript', 'N/A')}")
            print(f"Response: {result.get('response', 'N/A')[:100]}...")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error in Document mode test: {e}")

    # Test 3: Default behavior (no document_mode parameter)
    print("\n🔧 Test 3: Default behavior (no document_mode parameter)")
    try:
        response = client.post(
            "/transcribe",
            files={"audio": ("test.wav", audio_data, "audio/wav")}
        )
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Response keys: {list(result.keys())}")
            print(f"Transcript: {result.get('transcript', 'N/A')}")
            print(f"Response: {result.get('response', 'N/A')[:100]}...")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error in default behavior test: {e}")


if __name__ == "__main__":
    print("🚀 Starting transcribe endpoint tests...")
    test_transcribe_endpoint()
    print("\n✅ Tests completed!")
