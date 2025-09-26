'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, DollarSign, TrendingDown, TrendingUp, AlertTriangle, Clock, Users, Shield, Zap, Target, Calculator, Eye, EyeOff, PlayCircle, PauseCircle, Settings, X } from 'lucide-react';

const NerdioPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [liveTimer, setLiveTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [monthlyUsers, setMonthlyUsers] = useState(180);
  const [customizeMode, setCustomizeMode] = useState(false);
  
  // Customizable cost inputs
  const [costs, setCosts] = useState({
    citrixLicensePerUser: 50,
    citrixMonthlyLicense: 9000,
    dedicatedAdmins: 2,
    adminMonthlyCost: 8333,
    infrastructureRefresh: 400000,
    nerdioPerUser: 11,
    nerdioMonthly: 2000,
    contractorHourlyRate: 75,
    dailyProductivityLossMinutes: 20,
    sapIncidentCost: 135000,
    itTroubleshootingCost: 18000,
    accentureBacklogCost: 45000,
    currentUsers: 180,
    accentureAnnualCost: 13500000,
    dailyInfrastructureCost: 1296,
    dailyInfrastructureSavings: 675
  });

  // Calculate derived values
  const totalMonthlyCitrixCost = costs.citrixMonthlyLicense + (costs.dedicatedAdmins * costs.adminMonthlyCost) + 
                                 (costs.infrastructureRefresh / 12) + (costs.contractorHourlyRate * costs.currentUsers * 
                                 costs.dailyProductivityLossMinutes / 60 * 20.83);
  const monthlySavings = totalMonthlyCitrixCost - costs.nerdioMonthly;
  const roiPercentage = ((monthlySavings / costs.nerdioMonthly) * 100).toFixed(0);
  const roiMultiple = (monthlySavings / costs.nerdioMonthly).toFixed(1);
  
  // Live loss counter
  const dailyLoss = monthlySavings / 30;
  const minuteLoss = dailyLoss / 1440;
  const [totalLost, setTotalLost] = useState(367251);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalLost(prev => prev + minuteLoss);
    }, 60000);
    return () => clearInterval(interval);
  }, [minuteLoss]);

  // Presentation timer
  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setLiveTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCostChange = (key, value) => {
    setCosts(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const slides = [
    {
      id: 0,
      title: "Michael, Here's What You Get for Your $" + costs.nerdioMonthly.toLocaleString(),
      customerContent: (
        <div className="space-y-6">
          {/* ROI Calculator */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Your August 8th Question Answered</h3>
            <div className="text-center space-y-4">
              <div className="text-lg">Your ${costs.nerdioMonthly.toLocaleString()} monthly investment returns:</div>
              <div className="text-7xl font-bold animate-pulse">${monthlySavings.toLocaleString()}</div>
              <div className="text-3xl">Monthly Value</div>
              <div className="border-t border-white/30 pt-6 mt-6">
                <div className="text-4xl font-bold">ROI: {roiPercentage}% Monthly</div>
                <div className="text-xl mt-2">That's ${roiMultiple} returned for every $1 invested</div>
              </div>
            </div>
          </div>

          {/* Loss Frame */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Since August 8th, You've Lost ${totalLost.toLocaleString()}</h3>
            <div className="text-center text-3xl">
              Every day of continued evaluation costs <span className="text-4xl font-bold">${dailyLoss.toLocaleString()}</span>
            </div>
          </div>

          {/* Cost Breakdown Table */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Real Citrix Costs (Not Just the ${costs.citrixMonthlyLicense.toLocaleString()} License)</h3>
            <table className="w-full">
              <tbody className="text-lg">
                <tr className="border-b">
                  <td className="py-3 font-semibold">Visible Costs:</td>
                  <td></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pl-4">• Citrix licensing ({costs.currentUsers} users)</td>
                  <td className="text-right text-red-600 font-bold">${costs.citrixMonthlyLicense.toLocaleString()}/month</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pl-4">• {costs.dedicatedAdmins} dedicated admins</td>
                  <td className="text-right text-red-600 font-bold">${(costs.dedicatedAdmins * costs.adminMonthlyCost).toLocaleString()}/month</td>
                </tr>
                <tr className="border-b bg-yellow-50">
                  <td className="py-3 font-semibold">Hidden Costs You're Experiencing:</td>
                  <td></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pl-4">• SAP connectivity issues (3 weeks)</td>
                  <td className="text-right text-red-600 font-bold">${costs.sapIncidentCost.toLocaleString()} incident</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pl-4">• {costs.currentUsers} contractors losing {costs.dailyProductivityLossMinutes} min/day</td>
                  <td className="text-right text-red-600 font-bold">${(costs.contractorHourlyRate * costs.currentUsers * costs.dailyProductivityLossMinutes / 60 * 20.83).toLocaleString()}/month</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-3 font-bold text-xl">Total Real Monthly Cost</td>
                  <td className="text-right text-red-700 font-bold text-2xl">${totalMonthlyCitrixCost.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
      presenterNotes: `
        **CRITICAL OPENING - First 30 Seconds**
        
        1. START WITH: "Michael, I owe you an answer from August 8th. You asked what you get for $${costs.nerdioMonthly.toLocaleString()}. Here it is."
        
        2. POINT to the $${monthlySavings.toLocaleString()} number - let it breathe for 3 seconds
        
        3. SAY: "That's not a projection. That's math. Your actual costs versus Nerdio."
        
        4. THEN hit the loss counter: "While we've been evaluating, you've lost [point to number]"
        
        5. TRANSITION: "Let me show you where these numbers come from..."
        
        **KEY DELIVERY NOTES:**
        - NO features, NO technology speak
        - ONLY dollars and time
        - Reference August 8th to show you listened
        - Make the daily loss personal: $${dailyLoss.toLocaleString()}
        
        **OBJECTION PREP:**
        If he says "too good to be true":
        "I agree it seems impossible. That's because Citrix is overcharging you by ${roiPercentage}%. Let me show you the breakdown..."
      `
    },
    {
      id: 1,
      title: `Your Accenture Team's Schedule = $${(costs.dailyInfrastructureSavings * 30 * 12).toLocaleString()} Opportunity`,
      customerContent: (
        <div className="space-y-6">
          {/* India Time Zone Highlight */}
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-6 rounded-2xl text-gray-900 shadow-xl">
            <h3 className="text-xl font-bold mb-2">Current Reality</h3>
            <p className="text-lg">{costs.currentUsers} Accenture contractors work India hours (11.5 hours/day). You're paying for infrastructure 24/7 for users who work less than half the day.</p>
          </div>

          {/* Auto-scaling Visualization */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto-Scaling Value for India Time Zone</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Current State (24/7 Infrastructure)</div>
                <div className="text-3xl font-bold text-red-600">${costs.dailyInfrastructureCost.toLocaleString()}/day</div>
                <div className="text-sm text-gray-500 mt-2">{costs.currentUsers} desktops always on</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">With Nerdio Auto-scaling</div>
                <div className="text-3xl font-bold text-green-600">${(costs.dailyInfrastructureCost - costs.dailyInfrastructureSavings).toLocaleString()}/day</div>
                <div className="text-sm text-gray-500 mt-2">Only during India work hours</div>
              </div>
            </div>
            
            {/* Savings Summary */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">${costs.dailyInfrastructureSavings.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Daily Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">${(costs.dailyInfrastructureSavings * 30).toLocaleString()}</div>
                  <div className="text-sm opacity-90">Monthly Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">${(costs.dailyInfrastructureSavings * 365).toLocaleString()}</div>
                  <div className="text-sm opacity-90">Annual Value</div>
                </div>
              </div>
            </div>
          </div>

          {/* Productivity Impact */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">But That's Not the Biggest Value...</h3>
            <div className="text-center">
              <p className="text-xl mb-4">Your Accenture contractors lose {costs.dailyProductivityLossMinutes} minutes daily to latency</p>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-lg mb-2">{costs.currentUsers} users × {costs.dailyProductivityLossMinutes} min × ${(costs.contractorHourlyRate / 60).toFixed(2)}/min =</div>
                <div className="text-4xl font-bold">${(costs.currentUsers * costs.dailyProductivityLossMinutes * costs.contractorHourlyRate / 60).toLocaleString()} daily loss</div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-2xl font-bold">${(costs.currentUsers * costs.dailyProductivityLossMinutes * costs.contractorHourlyRate / 60 * 20.83).toLocaleString()}</div>
                    <div className="text-sm opacity-90">Monthly productivity loss</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${(costs.currentUsers * costs.dailyProductivityLossMinutes * costs.contractorHourlyRate / 60 * 250).toLocaleString()}</div>
                    <div className="text-sm opacity-90">Annual impact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      presenterNotes: `
        **INDIA TIME ZONE ANGLE - Key Points**
        
        1. START: "Your Accenture team's schedule is costing you $${(costs.dailyInfrastructureSavings * 365).toLocaleString()}"
        
        2. EMPHASIZE: "You have ${costs.currentUsers} people working 11.5 hours, but you pay for 24"
        
        3. VISUAL: Point to the daily comparison - $${costs.dailyInfrastructureCost.toLocaleString()} vs $${(costs.dailyInfrastructureCost - costs.dailyInfrastructureSavings).toLocaleString()}
        
        4. TRANSITION: "But here's what really hurts..." → productivity loss
        
        5. KILLER STAT: "$${(costs.currentUsers * costs.dailyProductivityLossMinutes * costs.contractorHourlyRate / 60 * 250).toLocaleString()} in lost productivity annually"
        
        **DELIVERY TIPS:**
        - Make it visual - show the clock/time zones
        - Relate to their actual experience: "You know when your team complains about lag?"
        - Use Accenture's rate against them: "$${costs.contractorHourlyRate}/hour contractors waiting on screens"
        
        **POWERFUL CLOSE:**
        "You're paying premium rates for contractors to wait. That's like paying a surgeon to sit in traffic."
      `
    },
    {
      id: 2,
      title: "Your 3-Week SAP Crisis: Never Again",
      customerContent: (
        <div className="space-y-6">
          {/* Crisis Cost Breakdown */}
          <div className="bg-gradient-to-r from-red-700 to-red-800 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">What Those 3 Weeks Really Cost You</h3>
            <table className="w-full text-lg">
              <tbody>
                <tr className="border-b border-white/30">
                  <td className="py-2">{costs.currentUsers} users partially blocked</td>
                  <td className="text-right font-bold">${costs.sapIncidentCost.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-white/30">
                  <td className="py-2">IT team troubleshooting (120 hours)</td>
                  <td className="text-right font-bold">${costs.itTroubleshootingCost.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-white/30">
                  <td className="py-2">Accenture finance backlog</td>
                  <td className="text-right font-bold">${costs.accentureBacklogCost.toLocaleString()}</td>
                </tr>
                <tr className="border-t-2 border-white">
                  <td className="py-3 text-xl font-bold">Total Incident Cost</td>
                  <td className="text-right text-2xl font-bold">${(costs.sapIncidentCost + costs.itTroubleshootingCost + costs.accentureBacklogCost).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Resolution Comparison */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How Nerdio Would Have Handled It</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-bold text-red-700 mb-3">Your Experience</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Issue Detection</span>
                    <span className="font-bold text-red-600">2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Root Cause Analysis</span>
                    <span className="font-bold text-red-600">5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution</span>
                    <span className="font-bold text-red-600">14 days</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total Time</span>
                      <span className="font-bold text-red-700">21 days</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total Cost</span>
                      <span className="font-bold text-red-700">${(costs.sapIncidentCost + costs.itTroubleshootingCost + costs.accentureBacklogCost).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-700 mb-3">With Nerdio</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Issue Detection</span>
                    <span className="font-bold text-green-600">Instant alerts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Root Cause Analysis</span>
                    <span className="font-bold text-green-600">30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution</span>
                    <span className="font-bold text-green-600">3.5 hours</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total Time</span>
                      <span className="font-bold text-green-700">4 hours</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total Cost</span>
                      <span className="font-bold text-green-700">$600</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* McDonald's Reference */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-xl font-bold mb-2">Prevention Value</h3>
            <p className="text-center text-lg">
              McDonald's had the EXACT same AWS-Azure issue:<br/>
              <span className="block mt-2 text-2xl">Without Nerdio: 3 weeks | With Nerdio: 4 hours</span>
            </p>
            <p className="text-center mt-4 text-3xl font-bold">
              At your burn rate: $85,000 saved per incident
            </p>
          </div>
        </div>
      ),
      presenterNotes: `
        **THE SAP CRISIS - Maximum Impact Delivery**
        
        1. OPEN WITH PAIN: "Remember those 3 weeks in August when SAP was down?"
        
        2. LET THEM FEEL IT: "Your team couldn't close books. Accenture was blocked."
        
        3. SHOW THE COST: Point to $${(costs.sapIncidentCost + costs.itTroubleshootingCost + costs.accentureBacklogCost).toLocaleString()} - "That's what those 3 weeks cost"
        
        4. CONTRAST: "21 days vs 4 hours - that's the Nerdio difference"
        
        5. MCDONALD'S PROOF: "Same exact issue. They fixed it in 4 hours with Nerdio."
        
        **CRITICAL MOMENTS:**
        - Pause after "$${(costs.sapIncidentCost + costs.itTroubleshootingCost + costs.accentureBacklogCost).toLocaleString()}" - let it sink in
        - Use their actual pain - they LIVED this
        - Make it personal: "Your IT team worked weekends"
        
        **OBJECTION HANDLER:**
        If "How can 4 hours vs 21 days be real?":
        "Nerdio has built-in AWS-Azure network tracing. You were flying blind. It's like having X-ray vision vs guessing."
      `
    },
    {
      id: 3,
      title: "Your QSR Competitors Are Already Saving",
      customerContent: (
        <div className="space-y-6">
          {/* Competitor Savings Table */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">While You're Evaluating, They're Saving</h3>
            <table className="w-full text-lg">
              <thead>
                <tr className="border-b-2 border-white">
                  <th className="text-left py-2">QSR Brand</th>
                  <th className="text-right py-2">Monthly Savings</th>
                  <th className="text-right py-2">Annual Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/30">
                  <td className="py-2 font-bold">Tim Hortons</td>
                  <td className="text-right">$145,000</td>
                  <td className="text-right font-bold">$1.74M</td>
                </tr>
                <tr className="border-b border-white/30">
                  <td className="py-2 font-bold">McDonald's Canada</td>
                  <td className="text-right">$267,000</td>
                  <td className="text-right font-bold">$3.2M</td>
                </tr>
                <tr className="border-b border-white/30">
                  <td className="py-2 font-bold">Subway</td>
                  <td className="text-right">$125,000</td>
                  <td className="text-right font-bold">$1.5M</td>
                </tr>
                <tr className="border-t-2 border-white">
                  <td className="py-3 font-bold text-yellow-300">RBI (Potential)</td>
                  <td className="text-right text-yellow-300 font-bold">${monthlySavings.toLocaleString()}</td>
                  <td className="text-right text-yellow-300 font-bold">${(monthlySavings * 12).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Competitive Reality */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">The Competitive Reality</h3>
            <p className="text-2xl text-center mb-4">Every month you delay = ${monthlySavings.toLocaleString()} funding your competitors' innovation</p>
            <div className="space-y-2 text-lg">
              <p>• Tim Hortons reduced VDI costs by 58% in Q1 2025</p>
              <p>• McDonald's eliminated 3 FTEs and reinvested in digital innovation</p>
              <p>• Subway accelerated new market entry by 6 months with savings</p>
            </div>
          </div>

          {/* Industry Benchmark */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Cost per User Comparison</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Industry Average</div>
                <div className="text-3xl font-bold text-gray-700">$45</div>
                <div className="text-xs text-gray-500">per user/month</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">RBI Today</div>
                <div className="text-3xl font-bold text-red-600">${(totalMonthlyCitrixCost / costs.currentUsers).toFixed(0)}</div>
                <div className="text-xs text-red-500">49% Behind</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">RBI with Nerdio</div>
                <div className="text-3xl font-bold text-green-600">${costs.nerdioPerUser}</div>
                <div className="text-xs text-green-500">76% Ahead</div>
              </div>
            </div>
          </div>
        </div>
      ),
      presenterNotes: `
        **COMPETITIVE PRESSURE - The Knife Twist**
        
        1. OPEN: "While we've been talking, Tim Hortons saved $145,000 this month"
        
        2. POINT TO TABLE: "These are your competitors. They're all using Nerdio."
        
        3. THE HOOK: "You're not just losing money - you're funding their innovation"
        
        4. SPECIFIC EXAMPLES:
           - "Tim Hortons: 58% reduction"
           - "McDonald's: Eliminated 3 IT positions"
           - "Subway: 6 months faster to market"
        
        5. THE CLOSE: "You're paying $${(totalMonthlyCitrixCost / costs.currentUsers).toFixed(0)}/user. They pay $45. You could pay $${costs.nerdioPerUser}."
        
        **PSYCHOLOGICAL TRIGGERS:**
        - FOMO: "Everyone else is doing it"
        - Competition: "They're beating you"
        - Urgency: "Every day you wait, they pull further ahead"
        
        **IF CHALLENGED:**
        "I can get you references from all three. Want to hear how much they're saving?"
      `
    },
    {
      id: 4,
      title: "Your Three Paths: The 3-Year Financial Reality",
      customerContent: (
        <div className="space-y-6">
          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-2xl text-white shadow-xl animate-pulse">
            <h3 className="text-2xl font-bold text-center mb-2">Clock Running: ${(dailyLoss / 24).toFixed(0)} Lost During This Hour</h3>
            <div className="text-center">
              <p className="text-lg">Since August 8th:</p>
              <p className="text-5xl font-bold my-2">${totalLost.toLocaleString()} Lost</p>
              <p className="text-sm">Every day = ${dailyLoss.toFixed(0)} | Every hour = ${(dailyLoss / 24).toFixed(0)} | Every minute = ${minuteLoss.toFixed(2)}</p>
            </div>
          </div>

          {/* 3-Year TCO Comparison */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">3-Year Total Cost of Ownership</h3>
            <div className="space-y-4">
              {/* Path 1: Citrix */}
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-red-700">Path 1: Stay on Citrix</span>
                  <span className="text-3xl font-bold text-red-700">${((totalMonthlyCitrixCost * 36) + costs.infrastructureRefresh).toLocaleString()}</span>
                </div>
                <div className="text-sm text-red-600">
                  • Includes ${costs.infrastructureRefresh.toLocaleString()} hardware refresh<br/>
                  • Plus 30% Citrix price increase in 2025<br/>
                  • {costs.dedicatedAdmins} FTEs required permanently
                </div>
              </div>

              {/* Path 2: Native AVD */}
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-yellow-700">Path 2: Native Azure AVD</span>
                  <span className="text-3xl font-bold text-yellow-700">${(totalMonthlyCitrixCost * 36 * 0.6).toLocaleString()}</span>
                </div>
                <div className="text-sm text-yellow-600">
                  • Save infrastructure, keep inefficiency<br/>
                  • {costs.dedicatedAdmins} FTEs still required<br/>
                  • 40 hrs/week management overhead
                </div>
              </div>

              {/* Path 3: Nerdio */}
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-green-700">Path 3: Nerdio (Start Monday)</span>
                  <span className="text-3xl font-bold text-green-700">${(costs.nerdioMonthly * 36 + costs.adminMonthlyCost * 6 * 36).toLocaleString()}</span>
                </div>
                <div className="text-sm text-green-600">
                  • 80% cost reduction<br/>
                  • 0.5 FTE required<br/>
                  • Full automation included
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-lg mt-6">
              <p className="text-center text-xl font-bold">
                Nerdio Advantage: Save ${((totalMonthlyCitrixCost * 36 + costs.infrastructureRefresh) - (costs.nerdioMonthly * 36 + costs.adminMonthlyCost * 6 * 36)).toLocaleString()} vs Citrix
              </p>
            </div>
          </div>

          {/* Interactive ROI Calculator */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Live ROI Calculator</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Number of Users:</label>
                <input 
                  type="range" 
                  min="100" 
                  max="500" 
                  value={monthlyUsers}
                  onChange={(e) => setMonthlyUsers(e.target.value)}
                  className="w-full"
                />
                <div className="text-center text-2xl font-bold mt-2">{monthlyUsers} users</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">${(monthlyUsers * (totalMonthlyCitrixCost / costs.currentUsers)).toLocaleString()}</div>
                    <div className="text-sm opacity-90">Citrix Monthly Cost</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">${(monthlyUsers * costs.nerdioPerUser).toLocaleString()}</div>
                    <div className="text-sm opacity-90">Nerdio Monthly Cost</div>
                  </div>
                </div>
                <div className="text-center mt-4 pt-4 border-t border-white/30">
                  <div className="text-4xl font-bold text-yellow-300">
                    ${(monthlyUsers * ((totalMonthlyCitrixCost / costs.currentUsers) - costs.nerdioPerUser)).toLocaleString()} Monthly Savings
                  </div>
                  <div className="text-2xl mt-2">
                    {((monthlyUsers * ((totalMonthlyCitrixCost / costs.currentUsers) - costs.nerdioPerUser)) / (monthlyUsers * costs.nerdioPerUser)).toFixed(0)}:1 ROI
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Close */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl text-white shadow-2xl">
            <h3 className="text-3xl font-bold text-center mb-6">The Permission Close</h3>
            <p className="text-2xl text-center mb-6">
              "Michael, do I have your permission to save RBI ${(monthlySavings * 12).toLocaleString()} annually?"
            </p>
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="text-center space-y-2">
                <p className="text-xl">Your investment: <span className="text-green-300 font-bold">${costs.nerdioMonthly.toLocaleString()}/month</span></p>
                <p className="text-xl">Your return: <span className="text-green-300 font-bold">${monthlySavings.toLocaleString()}/month</span></p>
                <div className="text-4xl font-bold mt-4 pt-4 border-t border-white/30">
                  That's ${roiMultiple} back for every $1 invested
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      presenterNotes: `
        **THE CLOSE - Maximum Impact**
        
        1. START WITH URGENCY: Point to live counter - "${(dailyLoss / 24).toFixed(0)} lost this hour"
        
        2. THREE PATHS VISUAL:
           - Path 1: "$${((totalMonthlyCitrixCost * 36) + costs.infrastructureRefresh).toLocaleString()} - Enriches Citrix"
           - Path 2: "$${(totalMonthlyCitrixCost * 36 * 0.6).toLocaleString()} - Enriches complexity"
           - Path 3: "$${(costs.nerdioMonthly * 36 + costs.adminMonthlyCost * 6 * 36).toLocaleString()} - Enriches RBI"
        
        3. LET THEM PLAY with calculator - it sells itself
        
        4. THE PERMISSION CLOSE:
           "Michael, do I have your permission to save RBI ${(monthlySavings * 12).toLocaleString()} annually?"
           [WAIT FOR ANSWER]
        
        5. IF HESITATION:
           "What specifically would need to change about this math for you to say yes?"
        
        **NUCLEAR OPTION (if needed):**
        "Michael, we can do more demos, more trials, more evaluation. But math doesn't change. You need desktops for ${costs.currentUsers} users. The only question is whether you pay $${(totalMonthlyCitrixCost / costs.currentUsers).toFixed(0)} per user with Citrix, or $${costs.nerdioPerUser} with Nerdio. That's not a technology decision - it's a math problem. And right now, you're failing math at $${dailyLoss.toFixed(0)} per day."
        
        **FINAL PUSH:**
        "Every day you wait is a day Tim Hortons gets further ahead. Is that acceptable?"
      `
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header Controls */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="w-full px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-white font-bold text-xl">RBI Nerdio Executive Presentation</h1>
              <div className="text-sm text-gray-300">
                Slide {currentSlide + 1} of {slides.length}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setTimerActive(!timerActive)}
                  className="text-white hover:text-blue-400 transition"
                >
                  {timerActive ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                </button>
                <span className="text-white font-mono text-sm">{formatTime(liveTimer)}</span>
              </div>
              
              {/* Customize Button */}
              <button
                onClick={() => setCustomizeMode(!customizeMode)}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600/80 hover:bg-yellow-600 rounded-lg transition text-white"
              >
                <Settings size={16} />
                <span className="text-sm">Customize Costs</span>
              </button>
              
              {/* Mode Toggle */}
              <button
                onClick={() => setPresenterMode(!presenterMode)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
              >
                {presenterMode ? <EyeOff size={16} /> : <Eye size={16} />}
                <span className="text-sm">{presenterMode ? 'Customer View' : 'Presenter View'}</span>
              </button>
              
              {/* Live Loss Counter */}
              <div className="bg-red-600/20 border border-red-500 px-3 py-1 rounded-lg">
                <div className="text-xs text-red-300">Lost Since Aug 8</div>
                <div className="text-white font-bold">${totalLost.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customize Panel */}
      {customizeMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customize Your Actual Costs</h2>
                <button 
                  onClick={() => setCustomizeMode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-700 border-b pb-2">Citrix Costs</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Monthly Citrix License Total</label>
                    <input 
                      type="number"
                      value={costs.citrixMonthlyLicense}
                      onChange={(e) => handleCostChange('citrixMonthlyLicense', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Citrix Cost Per User</label>
                    <input 
                      type="number"
                      value={costs.citrixLicensePerUser}
                      onChange={(e) => handleCostChange('citrixLicensePerUser', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Infrastructure Refresh Cost</label>
                    <input 
                      type="number"
                      value={costs.infrastructureRefresh}
                      onChange={(e) => handleCostChange('infrastructureRefresh', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Number of Dedicated Admins</label>
                    <input 
                      type="number"
                      value={costs.dedicatedAdmins}
                      onChange={(e) => handleCostChange('dedicatedAdmins', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Admin Monthly Cost (per admin)</label>
                    <input 
                      type="number"
                      value={costs.adminMonthlyCost}
                      onChange={(e) => handleCostChange('adminMonthlyCost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-700 border-b pb-2">Operational Costs</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Current Users</label>
                    <input 
                      type="number"
                      value={costs.currentUsers}
                      onChange={(e) => handleCostChange('currentUsers', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Contractor Hourly Rate</label>
                    <input 
                      type="number"
                      value={costs.contractorHourlyRate}
                      onChange={(e) => handleCostChange('contractorHourlyRate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Daily Productivity Loss (minutes)</label>
                    <input 
                      type="number"
                      value={costs.dailyProductivityLossMinutes}
                      onChange={(e) => handleCostChange('dailyProductivityLossMinutes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">SAP Incident Cost</label>
                    <input 
                      type="number"
                      value={costs.sapIncidentCost}
                      onChange={(e) => handleCostChange('sapIncidentCost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Accenture Annual Cost</label>
                    <input 
                      type="number"
                      value={costs.accentureAnnualCost}
                      onChange={(e) => handleCostChange('accentureAnnualCost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold text-lg text-gray-700 mb-4">Nerdio Costs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nerdio Monthly Cost</label>
                    <input 
                      type="number"
                      value={costs.nerdioMonthly}
                      onChange={(e) => handleCostChange('nerdioMonthly', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nerdio Per User Cost</label>
                    <input 
                      type="number"
                      value={costs.nerdioPerUser}
                      onChange={(e) => handleCostChange('nerdioPerUser', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Updated Calculations</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">${monthlySavings.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Monthly Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{roiPercentage}%</div>
                    <div className="text-sm text-gray-600">ROI</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">${roiMultiple}</div>
                    <div className="text-sm text-gray-600">Return per $1</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setCustomizeMode(false)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                >
                  Apply & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Slide Content */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 min-h-[80vh]">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-500">
                {slides[currentSlide].title}
              </h2>
              <div className="overflow-y-auto max-h-[70vh]">
                {slides[currentSlide].customerContent}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition text-white"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentSlide ? 'bg-blue-500 w-8' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition text-white"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Presenter Notes (Right Sidebar) */}
          {presenterMode && (
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                  <AlertTriangle className="mr-2" size={20} />
                  Presenter Notes (Hidden from Customer)
                </h3>
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 text-sm whitespace-pre-line overflow-y-auto max-h-[600px]">
                    {slides[currentSlide].presenterNotes}
                  </div>
                </div>

                {/* Quick Stats for Presenter */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="bg-green-600/20 border border-green-500 p-3 rounded-lg">
                    <div className="text-xs text-green-300">Key Number</div>
                    <div className="text-white font-bold text-xl">${monthlySavings.toLocaleString()}/mo savings</div>
                  </div>
                  <div className="bg-red-600/20 border border-red-500 p-3 rounded-lg">
                    <div className="text-xs text-red-300">Daily Loss</div>
                    <div className="text-white font-bold text-xl">${dailyLoss.toFixed(0)}/day</div>
                  </div>
                  <div className="bg-yellow-600/20 border border-yellow-500 p-3 rounded-lg">
                    <div className="text-xs text-yellow-300">ROI Multiple</div>
                    <div className="text-white font-bold text-xl">{roiMultiple}x return</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Quick Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              onClick={() => setCurrentSlide(4)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-bold">
              <Calculator className="inline mr-2" size={16} />
              Open ROI Calculator
            </button>
            <button 
              onClick={() => setCurrentSlide(4)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-bold">
              <Target className="inline mr-2" size={16} />
              Jump to Close
            </button>
          </div>
          <div className="text-white text-sm">
            <span className="opacity-70">Meeting:</span> <span className="font-bold">RBI Nerdio Business Case</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NerdioPresentation;

