// 제한사항 - q.empty 됐다해서 무조건 xx 공백기가 있을 수 있음!!! 
// js로도 구현

#include <string>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

int solution(vector<vector<int>> jobs) {
    sort(jobs.begin(), jobs.end());
    
    priority_queue<pair<int, int> > q;
    
    int time = 0;
    int index = 0;
    
    for(int i = 0; i < jobs.size(); i++) {
        int requestedTime = jobs[i][0];
        int processingTime = jobs[i][1];
        
        if (requestedTime == 0) {
            q.push({ -processingTime, requestedTime });
            index += 1;
        } else break;
    }
    
    int totalTime = 0;
    
    while(!q.empty() || index < jobs.size()) {
        if (!q.empty()){
            pair<int, int> job = q.top();
            int requestedTime = job.second;
            int processingTime = -job.first;

            q.pop();
            totalTime += (time - requestedTime) + processingTime;

            time += processingTime;
        } else time += 1;
        
        printf("%d ", time);
        
        for(int i = index; i < jobs.size(); i++) {
            if (jobs[i][0] <= time) {
                q.push({ -jobs[i][1], jobs[i][0] });
                index += 1;
            } else break;
        }
    }
    
    return totalTime / jobs.size();
}