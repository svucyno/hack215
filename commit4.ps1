# commit4.ps1
# Syncing and committing the Officer Roster implementation

$repoRoot = "hack215"
$sourceRoot = "c:\Users\K\Desktop\CGMP ATP\CGMP"

# 1. Create necessary directories in repo
New-Item -ItemType Directory "$repoRoot\backend" -Force
New-Item -ItemType Directory "$repoRoot\backend\models" -Force
New-Item -ItemType Directory "$repoRoot\backend\controllers" -Force
New-Item -ItemType Directory "$repoRoot\backend\routes" -Force
New-Item -ItemType Directory "$repoRoot\frontend\src\pages" -Force
New-Item -ItemType Directory "$repoRoot\frontend\src\components" -Force
New-Item -ItemType Directory "$repoRoot\frontend\public\images" -Force

# 2. Copy Backend Files
Copy-Item "$sourceRoot\backend\models\User.js" "$repoRoot\backend\models\User.js" -Force
Copy-Item "$sourceRoot\backend\controllers\adminController.js" "$repoRoot\backend\controllers\adminController.js" -Force
Copy-Item "$sourceRoot\backend\controllers\authController.js" "$repoRoot\backend\controllers\authController.js" -Force
Copy-Item "$sourceRoot\backend\routes\adminRoutes.js" "$repoRoot\backend\routes\adminRoutes.js" -Force
Copy-Item "$sourceRoot\backend\server.js" "$repoRoot\backend\server.js" -Force

# 3. Copy Frontend Files
Copy-Item "$sourceRoot\frontend\src\pages\AdminDashboard.jsx" "$repoRoot\frontend\src\pages\AdminDashboard.jsx" -Force
Copy-Item "$sourceRoot\frontend\src\pages\StaffDashboard.jsx" "$repoRoot\frontend\src\pages\StaffDashboard.jsx" -Force
Copy-Item "$sourceRoot\frontend\src\components\OfficerDeptModal.jsx" "$repoRoot\frontend\src\components\OfficerDeptModal.jsx" -Force
Copy-Item "$sourceRoot\frontend\src\App.jsx" "$repoRoot\frontend\src\App.jsx" -Force

# 4. Copy Assets
Copy-Item "$sourceRoot\frontend\public\images\user_ai_reporting_1774207794930.png" "$repoRoot\frontend\public\images\user_ai_reporting_1774207794930.png" -Force
Copy-Item "$sourceRoot\frontend\public\images\ai_report_transformation_1774207849035.png" "$repoRoot\frontend\public\images\ai_report_transformation_1774207849035.png" -Force

# 5. Git Operations
Set-Location $repoRoot
git add .
git commit -m "Implemented Officer Roster (Deployment) with Status & Department Assignment"
git push origin main
Set-Location ..
