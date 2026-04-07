import { supabase } from '@/utils/supabase'

export class PatientService {
  // Get all patients
  static async getPatients() {
    console.log('🔍 Starting getPatients...')
    
    try {
      // Test connection first
      console.log('📡 Testing Supabase connection...')
      console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
      console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)
      
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📊 Supabase response:', { data, error })
      
      if (error) {
        console.error('❌ Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }
      
      console.log('✅ Patients fetched successfully:', data?.length || 0)
      return data || []
    } catch (error) {
      console.error('💥 Critical error in getPatients:', error)
      
      // Fallback to mock data for demo================
      console.log('🔄 Using mock data as fallback')
      return [
        {
          id: '1',
          code: 'BN001',
          name: 'Nguyễn Văn A',
          date_of_birth: '1980-01-15',
          gender: 'male',
          phone: '0901234567',
          email: 'nguyenvana@email.com',
          address: '123 Nguyễn Huệ, Q.1, TP.HCM',
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          code: 'BN002',
          name: 'Trần Thị B',
          date_of_birth: '1985-05-20',
          gender: 'female',
          phone: '0912345678',
          email: 'tranthib@email.com',
          address: '456 Lê Lợi, Q.3, TP.HCM',
          status: 'active',
          created_at: new Date().toISOString()
        }
      ]
    }
  }

  // Get patient by ID
  static async getPatientById(id) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching patient:', error)
      throw error
    }
  }

  // Create new patient
  static async createPatient(patientData) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([patientData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating patient:', error)
      throw error
    }
  }

  // Update patient
  static async updatePatient(id, patientData) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(patientData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating patient:', error)
      throw error
    }
  }

  // Delete patient
  static async deletePatient(id) {
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting patient:', error)
      throw error
    }
  }

  // Search patients
  static async searchPatients(query) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .or(`name.ilike.%${query}%,code.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error searching patients:', error)
      throw error
    }
  }

  // Get active patients count
  static async getActivePatientsCount() {
    try {
      const { count, error } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      if (error) throw error
      return count
    } catch (error) {
      console.error('Error getting active patients count:', error)
      throw error
    }
  }

  // Generate unique patient code
  static async generatePatientCode() {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('code')
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) throw error

      const lastCode = data.length > 0 ? data[0].code : 'BN000'
      const lastNumber = parseInt(lastCode.replace('BN', ''))
      console.log('lastNumber', lastNumber)
      const newNumber = lastNumber + 1
      return `BN${newNumber.toString().padStart(4, '0')}`
    } catch (error) {
      console.error('Error generating patient code:', error)
      return 'BN001'
    }
  }
}
