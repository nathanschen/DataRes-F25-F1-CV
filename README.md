# DataRes-F25-F1-CV

Video source: F1 Youtube

# Model:
Detect & track each car (bounding boxes + team)
    Yolo segmentation
    Yolo classification to determine team
Output/Input: cropped image of each car
    Predict 2D keypoints on the car (front center, rear center, left/right front wheel, left/right rear wheel, optionally roof/hood corners)
    Yolo keypoint detection
Output/Input: list of points for each car feature
    Compute axis vectors & angles using key points

# Analysis:
Heatmap of most common angles across each team
Maybe also # minutes each team is shown



# run backend:
cd backend
docker build --no-cache -t f1-backend .
docker run -p 8000:8000 f1-backend

# run frontend:
cd frontend
npm install
npm run dev
