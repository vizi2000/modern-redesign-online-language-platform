#!/bin/bash

# Create GitHub repository using git commands
# This script helps create a new repository on GitHub

echo "🚀 Creating GitHub Repository: akademia-poliglotki-redesign"
echo "========================================================"

# Repository details
REPO_NAME="akademia-poliglotki-redesign"
REPO_DESC="Modern redesign of Akademia Poliglotki - Online Language Learning Platform with React, multi-page architecture, and production-ready features"

echo "Repository Name: $REPO_NAME"
echo "Description: $REPO_DESC"
echo ""

echo "📋 Instructions to create GitHub repository:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Description: $REPO_DESC"
echo "4. Set as Public"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""

echo "🔗 After creating the repository, run:"
echo "git remote add origin https://github.com/vizi2000/$REPO_NAME.git"
echo "git branch -M master"
echo "git push -u origin master"
echo ""

echo "📊 Current local repository status:"
git log --oneline -3
echo ""
echo "✅ Ready to push v4.0.0 Production-Ready Platform!"